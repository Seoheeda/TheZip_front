import React, { useState, useRef, useEffect } from "react";
import CateChoice from "./cateChoice";
import HouseChoice from "./houseChioice";
import HouseDetail from "./houseDetail";

const FindHouse = () => {
  const [option, setOption] = useState(-1);
  const [dropdownViewHouse, setDropdownViewHouse] = useState(false);
  const [charterId, SetCharterId] = useState(null);
  const dropdownRef = useRef(null);

  return (
    <div className="flex flex-col h-full w-full lg:w-1/2 border border-gray-2 rounded-2xl p-10 items-center bg-gradient-to-br from-white to-gray-100 shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-700 mb-7">
        내 관심 집 보기
      </h2>
      <div className="flex w-full space-x-5">
        <div className="flex x-1/3 xl:w-1/4 pb-3">
          <CateChoice
            option={option}
            setOption={setOption}
            setDropdownViewHouse={setDropdownViewHouse}
          />
        </div>
        <div className="relative w-3/4">
          <HouseChoice
            option={option}
            dropdownRef={dropdownRef}
            dropdownViewHouse={dropdownViewHouse}
            setDropdownViewHouse={setDropdownViewHouse}
            SetCharterId={SetCharterId}
          />
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row w-full min-h-96 overflow-hidden space-x-5 mt-3">
        <HouseDetail charterId={charterId} />
      </div>
    </div>
  );
};

export default FindHouse;
