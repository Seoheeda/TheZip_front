import React from "react";
import SearchAreaBox from "./searchAreaBox";
import SearchResult from "./searchResult";

const SearchResultPopup = () => {
  return (
    <div className="border-r w-[650px] min-w-96">
      <SearchAreaBox />
      <SearchResult />
    </div>
  );
};

export default SearchResultPopup;
