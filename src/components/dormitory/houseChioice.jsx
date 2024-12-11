import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { COMPARE_OPTIONS } from "../../utils/enum";
import HouseList from "./houseList";

const FindHouse = ({
  option,
  dropdownRef,
  dropdownViewHouse,
  setDropdownViewHouse,
  SetCharterId,
}) => {
  const containerRef = useRef(null); // 드롭다운 전체를 감싸는 컨테이너

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 드롭다운 외부 클릭 시 닫기
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDropdownViewHouse(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownViewHouse]);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      ref={containerRef} // 컨테이너에 참조 추가
    >
      <div
        className={`w-full h-14 px-5 text-center rounded-xl cursor-pointer flex justify-between items-center shadow-md border ${
          dropdownViewHouse ? "border-primary-1" : "border-gray-200"
        }`}
        onClick={() => setDropdownViewHouse(!dropdownViewHouse)}
      >
        {option > -1 ? (
          <p className="truncate">{COMPARE_OPTIONS[option]}</p>
        ) : (
          <p className="truncate">옵션 선택하기</p>
        )}
        {dropdownViewHouse ? (
          <IoIosArrowUp className="text-primary-1 text-xl" />
        ) : (
          <IoIosArrowDown className="text-primary-1 text-xl" />
        )}
      </div>

      {dropdownViewHouse && option > -1 && (
        <div className="absolute w-full bg-white max-h-96 rounded-lg shadow-lg z-50 mt-2">
          <HouseList
            option={option}
            setDropdownViewHouse={setDropdownViewHouse}
            dropdownRef={dropdownRef}
            SetCharterId={SetCharterId}
          />
        </div>
      )}
      {dropdownViewHouse && option === -1 && (
        <div className="absolute w-full bg-white h-14 p-4 border rounded-lg shadow-lg z-50 mt-2">
          상위 옵션을 선택해주세요.
        </div>
      )}
    </div>
  );
};

export default FindHouse;
