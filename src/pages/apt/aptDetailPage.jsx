import React from "react";
import Map from "../../components/realPriceMap/detail/mapDetail";
import DetailPopup from "../../components/realPriceMap/detail/detailPopup";

const AptDetailPage = () => {
  return (
    <div className="w-full h-auto flex ">
      <DetailPopup />
      <Map />
    </div>
  );
};

export default AptDetailPage;
