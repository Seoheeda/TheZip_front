import React from "react";
import SearchBox from "../search/searchBox";
import AreaDropdown from "./areaDropdown";
import InterestAreaSearch from "./interestAreaSearch";
import PopularCharter from "./popularCharter";

const Search = ({
  searched,
  searchTerm,
  setSearchTerm,
  charterList,
  favoriteAreas,
}) => {
  return (
    <div className="flex flex-col w-96 rounded-sm shadow-lg top-5 left-1 sm:left-10  absolute z-10">
      <div className="bg-white mb-10">
        {/* 검색 박스 */}
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          charterList={charterList}
        />

        {/* 검색 결과 미리보기 */}
        {!searched && <AreaDropdown />}

        {/* 관심지역 선택 버튼 */}
        {!searched && <InterestAreaSearch />}
      </div>
      {!searched && <PopularCharter />}
    </div>
  );
};

export default Search;
