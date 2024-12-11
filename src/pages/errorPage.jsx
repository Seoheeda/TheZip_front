import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-800">
      <FaExclamationTriangle className="text-primary-1 mb-6" size={80} />
      <h1 className="text-4xl font-bold mb-4">404: Page Not Found</h1>
      <p className="text-lg mb-6">찾으시는 페이지가 존재하지 않습니다.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary-1 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default ErrorPage;
