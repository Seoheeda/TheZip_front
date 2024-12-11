import React, { useEffect, useRef, useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getCharterDetail } from "../../../api/charters";

const MapAptArea = () => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const mapRef = useRef(null); // 지도를 저장할 ref

  const { charterId } = useParams();
  const [charterDetail, setCharterDetail] = useState(null);

  const getDetail = async () => {
    try {
      const response = await getCharterDetail(charterId);
      setCharterDetail(response.data[0]); // response.data가 배열이라면 [0]만 저장
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    const loadMap = () => {
      if (!charterDetail) {
        setTimeout(loadMap, 500); // 500ms 대기 후 다시 호출
        return; // charterDetail이 없으면 종료
      }

      // Kakao Maps API Script 로드
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          if (!mapRef.current) return;

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const container = mapRef.current;
                const options = {
                  center: new window.kakao.maps.LatLng(lat, lng),
                  level: 3,
                };
                const map = new window.kakao.maps.Map(container, options);
                mapRef.current = map;

                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(
                  `${charterDetail.charterGu} ${charterDetail.charterDong} ${charterDetail.bonbun}-${charterDetail.bubun}`,
                  function (result, status) {
                    if (status === window.kakao.maps.services.Status.OK) {
                      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                      const imageSrc = "/marker.png";
                      const imageSize = new window.kakao.maps.Size(40, 40);
                      const imageOption = { offset: new window.kakao.maps.Point(12, 35) };
                      const markerImage = new window.kakao.maps.MarkerImage(
                        imageSrc,
                        imageSize,
                        imageOption
                      );

                      const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords,
                        image: markerImage,
                      });

                      map.setCenter(coords);
                    } else {
                      console.error("Geocoder addressSearch 실패: ", status);
                    }
                  }
                );
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
        console.error("Failed to load the Kakao Maps API. Check the API key.");
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    loadMap();
  }, [charterDetail]);

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
      <div id="map" ref={mapRef} className="w-full h-full" />
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
