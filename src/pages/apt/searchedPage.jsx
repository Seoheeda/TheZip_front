import React from "react";
import Map from "../../components/realPriceMap/list/mapList";
import SearchResultPopup from "../../components/realPriceMap/list/searchResultPopup";

const AreaSearchedPage = () => {
  return (
    <div className="w-full h-full flex ">
      <SearchResultPopup />
      <Map />
    </div>
  );
};

export default AreaSearchedPage;
