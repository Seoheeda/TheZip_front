import React from "react";
import { useRecoilState } from "recoil";
import chatbot from "../../assets/imgs/chatbot.png";
import { chatbotOpenState } from "../../recoil/atoms";

const PopupBtn = () => {
  const [chatbotOpen, setChatbotOpen] = useRecoilState(chatbotOpenState);

  const toggleChatbot = () => {
    setChatbotOpen((prev) => !prev);
  };

  return (
    <div className="flex z-10">
      {!chatbotOpen ? (
        <div
          onClick={toggleChatbot}
          className="fixed w-12 h-12 bottom-7 right-7 bg-white border-2 border-gray-1 rounded-full flex items-center justify-center cursor-pointer"
        >
          <img src={chatbot} alt="chatbot" />
        </div>
      ) : (
        <div
          onClick={toggleChatbot}
          className="fixed w-12 h-12 bottom-7 right-7 bg-white border-2 border-gray-1 rounded-full flex items-center justify-center cursor-pointer"
        >
          <div className="text-xl">X</div>
        </div>
      )}
    </div>
  );
};

export default PopupBtn;
