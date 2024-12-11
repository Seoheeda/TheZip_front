import { useEffect } from "react";

const useAddressToCoords = (address, callback) => {
  const geocodeAddress = () => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = {
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            };
            callback(coords);
          } else {
            console.error("Geocoder addressSearch 실패: ", status);
          }
        });
      });
    };

    script.onerror = () => {
      console.error("Kakao Maps API를 로드하는 데 실패했습니다.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  };

  geocodeAddress();
};

export default useAddressToCoords;
