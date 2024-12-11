import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { writePost } from "../../api/board";

const BoardPostPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitPost = async (e) => {
    e.preventDefault(); // 기본 제출 동작을 방지
    try {
      console.log(title);
      const response = await writePost(title, content);
      console.log(response.data);
      navigate("/board", { replace: true });
    } catch (error) {
      console.log("유저 정보를 불러오는 데 실패했습니다:", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <div className="max-w-4xl w-full max-h-xl bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 text-center">📄 글쓰기</h1>
        <form className="flex flex-col space-y-6" onSubmit={submitPost}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="border border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="8"
            placeholder="내용을 입력하세요"
            className="border border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-primary-1 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-2 transition-colors"
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardPostPage;
