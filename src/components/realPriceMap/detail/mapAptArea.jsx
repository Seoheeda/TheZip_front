import React, { useEffect } from "react";

const MapAptArea = ({ latitude, longitude }) => {
  useEffect(() => {
    console.log("Latitude:", latitude, "Longitude:", longitude);

    // 기존에 로드된 kakao 스크립트를 제거
    const kakaoScript = document.querySelector('script[src*="dapi.kakao.com"]');
    // if (kakaoScript) kakaoScript.remove();

    // 네이버 지도 API 로드
    const apiKey = process.env.REACT_APP_NAVER_API_KEY;
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}`;
    script.async = true;
    script.onload = () => {
      const naver = window.naver;

      // 지도 생성
      const center = new naver.maps.LatLng(latitude, longitude);
      const mapOptions = {
        center: center,
        zoom: 16,
      };

      const map = new naver.maps.Map("naver-map", mapOptions);

      // 작은 사각형 추가
      const rectangleBounds = new naver.maps.LatLngBounds(
        new naver.maps.LatLng(latitude - 0.001, longitude - 0.001), // 왼쪽 아래 좌표
        new naver.maps.LatLng(latitude + 0.001, longitude + 0.001), // 오른쪽 위 좌표
      );

      new naver.maps.Rectangle({
        map: map,
        bounds: rectangleBounds,
        strokeColor: "#E3C04D",
        strokeWeight: 2, // 테두리 두께
        fillColor: "#EDE9C1", // 채우기 색
        fillOpacity: 0.4, // 채우기 투명도
      });
    };

    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <div id="naver-map" className="w-full h-48 rounded-md" />;
};

export default MapAptArea;
