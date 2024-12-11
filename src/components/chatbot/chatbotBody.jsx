import React, { useState, useRef, useEffect } from "react";

const ChatbotBody = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const apiEndpoint = "https://api.openai.com/v1/chat/completions";
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) {
      return;
    }

    addMessage("user", message);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a real estate Q&A chatbot. Assist users in setting conditions for finding apartments. " +
                "You MUST ALWAYS respond in Korean if the user speaks in Korean, and in English if the user speaks in English." +
                "Do not engage in idle chatter. If the user attempts to divert the conversation, redirect them to ask apartment-related questions." +
                "If the user wants to buy an apartment, guide him to go to 실거래가 조회." +
                "If the user wants to rent a house by 월세 or 전세, guide him to go to 월세/전세가 조회." +
                "If the user mentions a specific region, guide him that this website has a service of searching houses by region." +
                "If the user wants to search by cost range, guide him to go to main page" +
                "If the user mentions, top popular houses, It is located in main page, 실거래가 조회 page, and 월세/전세가 조회 page" +
                "If the user mentions 기숙사, guide him to go to 기숙사와 비교하기" +
                "The user can search houses near to university",
            },
            ...messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.message,
            })),
            { role: "user", content: message },
          ],
          top_p: 1,
          temperature: 0.7,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
        }),
      });
      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";

      // const aiResponse = "이것은 모의응답입니다.";

      addMessage("bot", aiResponse);
    } catch (error) {
      console.error("error", error);
      addMessage("bot", "오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-[400px] h-[560px] mx-auto flex flex-col border-2 rounded-lg shadow-xl bg-white z-10">
      <h1 className="text-center text-xl font-semibold py-4 border-b">집PT</h1>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 w-full">
        {messages.length === 0 && (
          <div className="text-lg text-gray-1 text-center">
            아파트 조건 설정에 대한 질문을 해주세요 :)
          </div>
        )}
        {loading && (
          <span className="block text-center text-gray-500">답변을 기다리고 있습니다...</span>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.sender === "user" ? "bg-primary-4 text-md w-full" : "bg-gray-3 text-md"
            } px-4 py-2 rounded-lg  break-words`}
          >
            {msg.sender === "user" ? "나" : "챗봇"}: {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center justify-center border-t p-2">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex px-4 py-2 w-80 h-12 border rounded-lg focus:outline-none focus:border-primary-1 text-md"
        />
        <button
          onClick={handleSendMessage}
          className="flex ml-2 py-2 w-12 h-12 bg-primary-1 text-white text-sm rounded-lg hover:bg-primary-3 focus:outline-none justify-center"
        >
          <div className="self-center">전송</div>
        </button>
      </div>
    </div>
  );
};

export default ChatbotBody;
