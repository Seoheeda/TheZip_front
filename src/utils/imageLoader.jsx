import React, { useEffect, useState } from "react";
import apt from "../assets/imgs/apt.webp";

export const AptImageLoader = ({ imageURLs, alt }) => {
  const [imageSrc, setImageSrc] = useState(null); // 이미지 소스 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (!imageURLs) {
          setImageSrc(apt);
        }
        // imageURL이 http로 시작하지 않으면 이미지를 서버로부터 불러오기
        else if (!imageURLs.imageURL.startsWith("http")) {
          setImageSrc("http://70.12.60.165:8080/images/apart/" + imageURLs.imageURL);
        } else {
          // imageURL이 http로 시작하면 그대로 사용
          setImageSrc(imageURLs.imageURL);
        }
      } catch (error) {
        console.log(error);
        setImageSrc(apt); // 오류 발생 시 기본 이미지로 설정
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    loadImage();
  }, [imageURLs]);

  if (loading) {
    return <div className="spinner"></div>; // 로딩 중일 때 표시할 내용
  }

  return <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />;
};

export const CharterImageLoader = ({ imageURLs, alt, rounded }) => {
  const [imageSrc, setImageSrc] = useState(null); // 이미지 소스 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const loadImage = async () => {
      try {
        console.log("Image URLs:", imageURLs);
        if (!imageURLs) {
          setImageSrc(apt);
        }
        // imageURL이 http로 시작하지 않으면 이미지를 서버로부터 불러오기
        else if (!imageURLs.imageURL.startsWith("http")) {
          setImageSrc("http://70.12.60.165:8080/images/charter/" + imageURLs.imageURL);
        } else {
          // imageURL이 http로 시작하면 그대로 사용
          setImageSrc(imageURLs.imageURL);
        }
      } catch (error) {
        console.log(error);
        setImageSrc(apt); // 오류 발생 시 기본 이미지로 설정
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    loadImage();
  }, [imageURLs]);

  if (loading) {
    return <div className="spinner"></div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`w-full h-full object-cover ${rounded ? "rounded-md" : ""}`}
    />
  );
};
