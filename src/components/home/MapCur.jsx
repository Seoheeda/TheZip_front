import React, { useEffect, useRef } from "react";
import { MdMyLocation } from "react-icons/md";

const Map = () => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const mapRef = useRef(null); // 지도를 저장할 ref

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        window.kakao.maps.load(() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const container = document.getElementById("map");
                const options = {
                  center: new window.kakao.maps.LatLng(lat, lng),
                  level: 3,
                };
                const map = new window.kakao.maps.Map(container, options);
                mapRef.current = map; // map을 ref에 저장

                const markerPosition = new window.kakao.maps.LatLng(lat, lng);
                const markerImageSrc = "/marker_here.png"; // 마커 이미지 URL
                const markerImageSize = new window.kakao.maps.Size(40, 40); // 마커 이미지 크기
                const markerImage = new window.kakao.maps.MarkerImage(
                  markerImageSrc,
                  markerImageSize
                );

                const marker = new window.kakao.maps.Marker({
                  position: markerPosition,
                  image: markerImage, // 커스텀 이미지 설정
                });
                marker.setMap(map);
              },
              (error) => {
                console.error("위치 정보를 가져오지 못했습니다.", error);
                alert("위치 정보를 사용할 수 없습니다.");
              }
            );
          } else {
            alert("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
          }
        });
      }, 100); // 100ms 후에 지도 로드
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const zoomIn = () => {
    if (mapRef.current) {
      const currentLevel = mapRef.current.getLevel();
      if (currentLevel > 1) {
        mapRef.current.setLevel(currentLevel - 1);
      }
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      const currentLevel = mapRef.current.getLevel();
      if (currentLevel < 14) {
        mapRef.current.setLevel(currentLevel + 1);
      }
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          if (mapRef.current) {
            const newCenter = new window.kakao.maps.LatLng(lat, lng);
            mapRef.current.setCenter(newCenter);
          }
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다.", error);
          alert("위치 정보를 사용할 수 없습니다.");
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
    }
  };

  return (
    <div className="w-full h-full relative">
      <div id="map" className="w-full h-full " />
      <div className="absolute hidden sm:block bg-white border border-gray-2 rounded-md top-3 right-3 z-10 cursor-pointer">
        <div onClick={zoomIn} className="border-b border-b-gray-2 ">
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
            className="w-5 mb-3 m-2"
          />
        </div>
        <div onClick={zoomOut}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
            className="w-5 mt-2 m-2"
          />
          <MdMyLocation
            onClick={handleLocationClick}
            className="absolute w-10 h-10 p-1 bg-white border border-gray-2 rounded-full top-24 right-0 z-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
