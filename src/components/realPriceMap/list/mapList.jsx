import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdMyLocation } from "react-icons/md";
import { searchLocByDongcode, searchLocByCost } from "../../../api/houseInfo";
import { formatToEokCheon } from "../../../utils/methods";

const MapList = () => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const mapRef = useRef(null); // 지도를 저장할 ref
  const navigate = useNavigate(); // navigate 함수 사용

  const { dongCode } = useParams();
  const { min } = useParams();
  const { max } = useParams();

  const [aptList, setAptList] = useState([]);

  const searchApt = async (dongcode) => {
    try {
      const response = await searchLocByDongcode(dongcode);
      setAptList(response.data); // 서버에서 받아온 데이터를 aptList에 저장합니다.
      console.log("지도에 찍기", response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.log(error);
    } finally {
    }
  };

  const searchAptByCost = async (dongcode, min, max) => {
    try {
      const response = await searchLocByCost(dongcode, min, max);
      setAptList(response.data); // 서버에서 받아온 데이터를 aptList에 저장합니다.
      console.log("지도에 찍기", response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (!min && !max) {
      searchApt(dongCode);
    } else {
      console.log("금액 포함해서 계산됨.", min, max);
      searchAptByCost(dongCode, min, max);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
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

              // const markerPosition = new window.kakao.maps.LatLng(lat, lng);
              // const markerImageSrc = "/marker_here.png";
              // const markerImageSize = new window.kakao.maps.Size(40, 40);
              // const markerImage = new window.kakao.maps.MarkerImage(
              //   markerImageSrc,
              //   markerImageSize
              // );

              // const marker = new window.kakao.maps.Marker({
              //   position: markerPosition,
              //   image: markerImage,
              // });
              // marker.setMap(map);

              // aptList 상태에 따라 처리
              if (aptList.length > 0) {
                console.log("아파트 정보 있음");
                addMarkersAndSetBounds(map);
              } else {
                console.log("아파트 정보 없음");
                // map.setCenter(markerPosition); // aptList가 비어있을 때 현재 위치로 설정
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
      });
    };

    script.onerror = () => {
      console.error("Kakao Maps API 로드에 실패했습니다. API 키를 확인하세요.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, aptList]);

  const addMarkersAndSetBounds = (map) => {
    const bounds = new window.kakao.maps.LatLngBounds();

    aptList.forEach((apt) => {
      const markerPosition = new window.kakao.maps.LatLng(apt.latitude, apt.longitude);
      const markerImageSrc = "/marker.png";
      const markerImageSize = new window.kakao.maps.Size(40, 40);
      const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: markerPosition,
        title: apt.name,
        image: markerImage,
      });
      marker.setMap(map);

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
          <div class="bg-white text-center w-[140px] m-2">
            <div class="mb-1 text-xs text-gray-1">최근 거래 금액</div>
            <div class="text-primary font-bold text-sm">
              ${formatToEokCheon(apt.dealAmount)}
            </div>
          </div>
        `,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        infoWindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infoWindow.close();
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        // 마커 클릭 시 해당 아파트의 상세 페이지로 이동
        navigate(`/realprice_map/detail/${apt.aptSeq}`);
      });

      bounds.extend(markerPosition);
    });

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
      <div className="absolute bg-white border border-gray-1 rounded-md top-3 right-3 z-10 cursor-pointer">
        <div onClick={zoomIn} className="border-b border-b-gray-2">
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
            className="w-6 mb-3 m-2"
          />
        </div>
        <div onClick={zoomOut}>
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
            className="w-6 mt-2 m-2"
          />
        </div>
      </div>
      <MdMyLocation
        onClick={handleLocationClick}
        className="absolute w-10 h-10 p-1 bg-white border border-gray-1 rounded-full top-28 right-3 z-10 cursor-pointer"
      />
    </div>
  );
};

export default MapList;
