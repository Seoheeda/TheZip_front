import React from "react";
import { AptImageLoader, CharterImageLoader } from "../utils/imageLoader";
import apt from "../assets/imgs/apt.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AptImgModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const settings = {
    dots: true, // 페이지네이션(점)
    infinite: true, // 무한 슬라이드
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 이미지 개수
    slidesToScroll: 1, // 한 번에 스크롤할 이미지 개수
    arrows: true, // 화살표 표시
    nextArrow: (
      <div className="slick-next slick-arrow absolute right-5 top-1/2 transform -translate-y-1/2 text-5xl text-white bg-black rounded-full p-3 z-50">
        → {/* 오른쪽 화살표 */}
      </div>
    ), // Tailwind으로 스타일링된 화살표
    prevArrow: (
      <div className="slick-prev slick-arrow absolute left-5 top-1/2 transform -translate-y-1/2 text-5xl text-white bg-black rounded-full p-3 z-50">
        ← {/* 왼쪽 화살표 */}
      </div>
    ), // Tailwind으로 스타일링된 화살표
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg w-3/4 sm:w-1/2 lg:w-1/3">
        <div className="flex justify-between px-5">
          <h2 className="text-lg font-semibold">상세 이미지</h2>
          <button onClick={onClose} className="text-2xl">
            X
          </button>
        </div>
        <div className="m-5">
          {content.length > 1 && (
            <Slider {...settings}>
              {content.map((item, index) => (
                <div key={index} className="w-full h-96">
                  <AptImageLoader imageURLs={item} alt="이미지" />
                </div>
              ))}
            </Slider>
          )}
          {content.length === 0 && (
            <div>
              <img src={apt} className="w-full h-96 truncate" />
            </div>
          )}
          {content.length === 1 && (
            <div className="w-full h-96">
              <AptImageLoader imageURLs={content[0]} alt="이미지" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CharterImgModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const settings = {
    dots: true, // 페이지네이션(점)
    infinite: true, // 무한 슬라이드
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 이미지 개수
    slidesToScroll: 1, // 한 번에 스크롤할 이미지 개수
    arrows: true, // 화살표 표시
    nextArrow: (
      <div className="slick-next slick-arrow absolute right-5 top-1/2 transform -translate-y-1/2 text-5xl text-white bg-black rounded-full p-3 z-50">
        → {/* 오른쪽 화살표 */}
      </div>
    ), // Tailwind으로 스타일링된 화살표
    prevArrow: (
      <div className="slick-prev slick-arrow absolute left-5 top-1/2 transform -translate-y-1/2 text-5xl text-white bg-black rounded-full p-3 z-50">
        ← {/* 왼쪽 화살표 */}
      </div>
    ), // Tailwind으로 스타일링된 화살표
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg w-3/4 sm:w-1/2 lg:w-1/3">
        <div className="flex justify-between px-5">
          <h2 className="text-lg font-semibold">상세 이미지</h2>
          <button onClick={onClose} className="text-2xl">
            X
          </button>
        </div>
        <div className="m-5">
          {content.length > 1 && (
            <Slider {...settings}>
              {content.map((item, index) => (
                <div key={index} className="w-full h-96">
                  <AptImageLoader imageURLs={item} alt="이미지" />
                </div>
              ))}
            </Slider>
          )}
          {content.length === 0 && (
            <div>
              <img src={apt} className="w-full h-96 truncate" />
            </div>
          )}
          {content.length === 1 && (
            <div className="w-full h-96">
              <CharterImageLoader imageURLs={content[0]} alt="이미지" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
