import React from "react";
import Map from "../../components/charter/list/mapList";
import SearchResultPopup from "../../components/charter/list/searchResultPopup";

const AreaSearchedPage = () => {
  return (
    <div className="w-full h-full flex ">
      <SearchResultPopup />
      <Map />
    </div>
  );
};

export default AreaSearchedPage;
