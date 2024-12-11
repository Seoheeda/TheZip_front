import React, { useEffect, useRef, useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getAptDetail } from "../../../api/houseInfo";

const MapAptArea = () => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const mapRef = useRef(null); // 지도를 저장할 ref

  const { aptSeq } = useParams();
  const [aptDetail, setAptDetail] = useState({});

  const getDetail = async () => {
    try {
      const response = await getAptDetail(aptSeq);
      setAptDetail(response.data);
      // console.log("아파트 정보", response.data);
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.error("Error fetching apartment details:", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      // setTimeout(() => {

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

              // 지도 로드 후 마커 추가
              addMarkersAndSetBounds(map);
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
      // }, 100); // 100ms 후에 지도 로드
    };

    script.onerror = () => {
      console.error("Kakao Maps API 로드에 실패했습니다. API 키를 확인하세요.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [aptDetail]);

  useEffect(() => {
    // aptDetail이 업데이트된 후에만 마커 추가
    if (aptDetail.latitude && aptDetail.longitude) {
      addMarkersAndSetBounds(mapRef.current);
    }
  }, [aptDetail]); // aptDetail이 변경될 때마다 호출

  const addMarkersAndSetBounds = (map) => {
    if (!aptDetail.latitude || !aptDetail.longitude || !map) return;

    const bounds = new window.kakao.maps.LatLngBounds();

    const markerPosition = new window.kakao.maps.LatLng(aptDetail.latitude, aptDetail.longitude);
    const markerImageSrc = "/marker.png";
    const markerImageSize = new window.kakao.maps.Size(40, 40);
    const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: markerPosition,
      title: "apt name",
      image: markerImage,
    });

    bounds.extend(markerPosition);
    map.setBounds(bounds);
  };

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
      <div id="map" className="w-full h-full" />
      <div className="absolute bg-white border border-gray-1 rounded-md top-5 right-5 z-10 cursor-pointer">
        <div onClick={zoomIn} className="border-b border-b-gray-2">
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
            className="w-3 mb-3 m-2"
          />
        </div>
        <div onClick={zoomOut}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
            className="w-3 mt-2 m-2"
          />
        </div>
      </div>
      <MdMyLocation
        onClick={handleLocationClick}
        className="absolute w-7 h-7 p-1 bg-white border border-gray-1 rounded-full top-24 right-5 z-10 cursor-pointer"
      />
    </div>
  );
};

export default MapAptArea;
