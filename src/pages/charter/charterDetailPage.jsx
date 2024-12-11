import React from "react";
import Map from "../../components/charter/detail/mapDetail";
import DetailPopup from "../../components/charter/detail/detailPopup";

const CharterDetailPage = () => {
  return (
    <div className="w-full h-full flex ">
      <DetailPopup />
      <Map />
    </div>
  );
};

export default CharterDetailPage;
