import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { MdMyLocation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { paginatedCharterList } from "../../../recoil/atoms";
import { formatToEokCheon } from "../../../utils/methods";

const MapList = () => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const mapRef = useRef(null); // 지도를 저장할 ref
  const navigate = useNavigate(); // navigate 함수 사용

  const [charterList] = useRecoilState(paginatedCharterList);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
        script.async = true;

        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              initializeMap();
            });
          } else {
            console.error("Kakao Maps SDK failed to load.");
          }
        };

        document.head.appendChild(script);

        return () => {
          document.head.removeChild(script);
        };
      }
    };

    loadKakaoMap();
  }, [charterList]);

  const initializeMap = () => {
    if (!window.kakao) {
      console.error("카카오 맵이 로드되지 않았습니다.");
      return;
    }

    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 서울 위치
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    if (charterList?.length) {
      addMarkers(map, charterList);
    }
  };

  const addMarkers = async (map, list) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error("Kakao Maps services are not available.");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    const bounds = new window.kakao.maps.LatLngBounds();

    const promises = list.map((charter) => {
      const address = `${charter.charterGu} ${charter.charterDong} ${charter.bonbun}-${charter.bubun}`;

      return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            const imageSrc = "/marker.png";
            const imageSize = new window.kakao.maps.Size(40, 40);
            const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
            );

            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
              title: charter.charterId,
              image: markerImage,
            });

            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `
                <div class="bg-white text-center w-[140px] m-2">
                  <div class="mb-1 text-xs text-gray-1">최근 거래 금액</div>
                  <div class="flex justify-center text-primary font-bold text-sm">
                    ${charter.charterKind}&nbsp;
                    ${
                      charter.charterKind === "월세"
                        ? `${charter.rent} / ${charter.deposit}`
                        : `${formatToEokCheon(charter.deposit)}`
                    }
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
              navigate(`/charters/detail/${charter.charterId}`);
            });

            bounds.extend(coords);
            resolve();
          } else {
            console.error(`Failed to find coordinates for address: ${address}`);
            reject();
          }
        });
      });
    });

    try {
      await Promise.all(promises);
      map.setBounds(bounds);
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div id="map" className="w-full h-full" />
      <MdMyLocation className="absolute w-10 h-10 p-1 bg-white border border-gray-1 rounded-full top-5 right-5 z-10 cursor-pointer" />
    </div>
  );
};

export default MapList;
