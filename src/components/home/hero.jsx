import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ onButtonClick }) => {
  return (
    <div className="relative bg-primary py-20">
      <div className="container mx-auto text-center px-4">
        {/* 제목과 설명 */}
        <h1 className="relative text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight animate-bounceSlow">
          <span className="px-4 py-2 rounded">
            🏡 The Zip, 집 찾기의 모든 것을 압축하다
          </span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-white font-light animate-fadeIn">
          완벽한 집을 빠르고 쉽게, 더집에서 만나세요.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 첫 번째 장점 */}
          <div
            className="flex flex-col items-center animate-zoomIn cursor-pointer"
            onClick={onButtonClick}
          >
            <div className="w-12 lg:w-16 h-12 lg:h-16 flex justify-center items-center bg-white rounded-full shadow-md">
              <span className="text-2xl lg:text-4xl">🔍</span>
            </div>
            <p className="mt-4 text-lg lg:text-2xl text-gray-900 font-semibold">
              쉽고 빠른 검색
            </p>
            <p className="text-gray-700 text-md lg:text-lg mt-2">
              원하는 지역과 조건을 간단히 입력하세요.
            </p>
          </div>

          {/* 두 번째 장점 */}
          <Link to="/realprice_map">
            <div className="flex flex-col items-center animate-zoomIn delay-100">
              <div className="w-12 lg:w-16 h-12 lg:h-16 flex justify-center items-center bg-white rounded-full shadow-md">
                <span className="text-2xl lg:text-4xl">📋</span>
              </div>
              <p className="mt-4 text-lg lg:text-2xl text-gray-900 font-semibold">
                다양한 매물 정보
              </p>
              <p className="text-gray-700 text-md lg:text-lg mt-2">
                맞춤형 매물 리스트를 제공합니다.
              </p>
            </div>
          </Link>

          {/* 세 번째 장점 */}
          <Link to="/dormitory">
            <div className="flex flex-col items-center animate-zoomIn delay-200">
              <div className="w-12 lg:w-16 h-12 lg:h-16 flex justify-center items-center bg-white rounded-full shadow-md">
                <span className="text-2xl lg:text-4xl">🏫</span>
              </div>
              <p className="mt-4 text-lg lg:text-2xl text-gray-900 font-semibold">
                기숙사와 비교하기
              </p>
              <p className="text-gray-700 text-md lg:text-lg mt-2">
                기숙사 조건과 주변 매물을 한눈에 비교하세요.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
