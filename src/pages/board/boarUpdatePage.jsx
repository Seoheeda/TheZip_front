import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePost } from "../../api/board";

const BoardUpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [boardId, setBoardId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const [post, setPost] = useState({ title: "", content: "" }); // post 상태를 초기화합니다.

  useEffect(() => {
    // location.state?.post가 존재하면 post 상태에 저장합니다.
    if (location.state?.post) {
      setBoardId(location.state.post.boardId);
      setTitle(location.state.post.title);
      setContent(location.state.post.content);
    }
  }, [location.state]);

  const submitUpdate = async (e) => {
    e.preventDefault(); // 기본 제출 동작을 방지
    try {
      if (boardId === null) {
        alert("불러오기를 실패했습니다!");
        return;
      }
      if (title === "" && content === "") {
        alert("제목 및 내용이 없습니다!");
        return;
      }
      const response = await updatePost(boardId, title, content);
      navigate("/board", { replace: true });
    } catch (error) {
      console.log("유저 정보를 불러오는 데 실패했습니다:", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <div className="max-w-4xl w-full max-h-xl bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 text-center">📄 글수정</h1>
        <form className="flex flex-col space-y-6" onSubmit={submitUpdate}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="border border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="8"
            placeholder="내용을 입력하세요"
            className="border border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-primary-1 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-2 transition-colors"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardUpdatePage;
