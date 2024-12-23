import React, { useEffect } from "react";

const MapAptArea = () => {
  const latitude = 37.594;
  const longitude = 127.0605;

  useEffect(() => {
    const loadNaverMap = () => {
      const { naver } = window;
      if (!naver || !naver.maps) {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
        return;
      }

      const mapElement = document.getElementById("naver-map");
      const center = new naver.maps.LatLng(latitude, longitude);
      const mapOptions = {
        center: center,
        zoom: 17,
      };
      const map = new naver.maps.Map(mapElement, mapOptions);

      const rectangleBounds = new naver.maps.LatLngBounds(
        new naver.maps.LatLng(latitude - 0.0002, longitude - 0.0002),
        new naver.maps.LatLng(latitude + 0.0002, longitude + 0.0002),
      );

      new naver.maps.Rectangle({
        map: map,
        bounds: rectangleBounds,
        strokeColor: "#E3C04D",
        strokeWeight: 2,
        fillColor: "#EDE9C1",
        fillOpacity: 0.4,
      });
    };

    const scriptId = "naver-map-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_API_KEY}&submodules=geocoder`;
      script.async = true;
      script.onload = loadNaverMap;
      document.head.appendChild(script);
    } else {
      loadNaverMap();
    }
  }, [latitude, longitude]);

  return <div id="naver-map" className="w-full h-48 rounded-md" />;
};

export default MapAptArea;
