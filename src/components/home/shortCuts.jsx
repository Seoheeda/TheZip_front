import React from "react";
import { useNavigate } from "react-router-dom";

const ShortCuts = () => {
  const navigate = useNavigate();

  // 엑세스 토큰 존재 여부 확인 함수
  const isLoggedIn = () => {
    return !!localStorage.getItem("accessToken");
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800">바로 가기</h3>
      <div className="mt-4 space-y-4">
        <button
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          onClick={() => navigate("/realprice_map")}
        >
          매매 실거래가 조회
        </button>
        <button
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          onClick={() => navigate("/charters")}
        >
          전/월세 실거래가 조회
        </button>
        <button
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          onClick={() => navigate("/dormitory")}
        >
          기숙사와 비교하기
        </button>
        <button
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          onClick={() => navigate("/board")}
        >
          공지사항
        </button>
        <button
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          onClick={() => {
            if (isLoggedIn()) {
              navigate("/mypage");
            } else {
              alert("로그인 시 이용 가능한 서비스입니다.");
            }
          }}
        >
          마이페이지
        </button>
      </div>
    </div>
  );
};

export default ShortCuts;
