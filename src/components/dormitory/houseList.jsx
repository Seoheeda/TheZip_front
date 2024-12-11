import React, { useState, useEffect } from "react";
import { fetchLikeCharter } from "../../api/charters";
import { formatToEokCheon, formatToPeung } from "../../utils/methods";
import { CharterImageLoader } from "../../utils/imageLoader";
import Skeleton from "react-loading-skeleton"; // Skeleton 라이브러리 추가
import "react-loading-skeleton/dist/skeleton.css"; // Skeleton 스타일 추가

const HouseList = ({ option, setDropdownViewHouse, dropdownRef, SetCharterId }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownViewHouse(false);
    }
  };

  const getLikeCharters = async (type) => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await fetchLikeCharter(type);
      setList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching charters:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const getList = () => {
    if (option === 0) getLikeCharters("전세");
    else getLikeCharters("월세");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getList();
  }, [option]);

  return (
    <div className="bg-white max-h-96 overflow-auto custom-scrollbar-big border border-gray-200 mt-2 rounded-lg shadow-lg p-4 z-50">
      <ul className="space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="flex w-full bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer p-4"
              >
                <div className="w-1/3 h-24">
                  <Skeleton height="100%" width="100%" />
                </div>
                <div className="w-2/3 pl-4 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                    <Skeleton width="80%" />
                  </h3>
                  <div className="text-gray-600 text-sm truncate mb-2">
                    <Skeleton width="60%" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    <Skeleton width="50%" />
                  </div>
                </div>
              </li>
            ))
          : list.map((option, i) => (
              <li
                key={i}
                className="flex w-full bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer p-4"
                onClick={() => {
                  SetCharterId(option.charterId);
                  setDropdownViewHouse(false);
                }}
              >
                <div className="w-1/3 h-24">
                  <CharterImageLoader imageURLs={option.image} alt={option.title} rounded={true} />
                </div>
                <div className="w-2/3 pl-4 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                    {option.charterGu}
                    {option.charterDong} {option.name.replace(/^\(|\)$/g, "")}
                  </h3>
                  <div className="text-gray-600 text-sm truncate mb-2">
                    {option.buildingUse} {option.size}㎡ ({Math.round(formatToPeung(option.size))}
                    평)
                  </div>
                  <div className="text-md text-primary-1">
                    {option.charterKind === "월세" ? (
                      <div>
                        {option.charterKind} {option.rent} / {option.deposit}
                      </div>
                    ) : (
                      <div>
                        {option.charterKind} {formatToEokCheon(option.deposit)}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default HouseList;
