import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchBox = ({ searchTerm, setSearchTerm, aptList }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* 검색창 */}
      <div className="flex h-14 w-full rounded-sm bg-white z-10">
        <IoSearch className="absolute text-primary-1 text-2xl left-3 top-4" />
        <input
          placeholder="건물명을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full border-b-2 pl-12 pr-5 text-sm focus:border-primary-1 focus:border-2 outline-none"
        />
      </div>

      {/* 검색 결과 리스트 */}
      {aptList.length > 0 && (
        <ul className="absolute mt-2 w-full rounded-lg shadow-lg z-0 h-96 overflow-y-auto custom-scrollbar">
          {aptList.map((apt, index) => (
            <li
              key={index}
              className="px-6 py-4 mb-2 hover:bg-primary-4 bg-white cursor-pointer text-sm flex justify-between items-center rounded-lg border border-primary-3 shadow-md transition-all duration-200"
              onClick={() => navigate(`/realprice_map/detail/${apt.aptSeq}`)}
            >
              <div className="flex items-center gap-2">
                <IoSearch className="text-primary-1" />
                <div>
                  <div className="font-bold">{apt.apartName}</div>
                  <div className="text-xs text-gray-500">{apt.buildYear}</div>
                </div>
              </div>
              <div className="text-sm text-primary-1">{apt.dongName}</div>
            </li>
          ))}
        </ul>
      )}

      {/* 검색 결과가 없을 경우 */}
      {searchTerm.trim() !== "" && aptList.length === 0 && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 text-center py-4 text-sm text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default SearchBox;
