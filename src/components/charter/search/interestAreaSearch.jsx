import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { getInterestArea } from "../../../api/interest";

const InterestAreaSearch = () => {
  const [dropdownView, setDropdownView] = useState(false);
  const [favoriteAreas, setFavoriteAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const fetchInterestArea = async () => {
    try {
      const response = await getInterestArea();
      setFavoriteAreas(response.data);
    } catch (error) {
      alert("관심지역을 조회할 수 없습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      fetchInterestArea();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAreaChange = (area) => {
    setSelectedArea(area.name);
    setDropdownView(false);
    navigate(`/charters/dong/${area.dongCode}`);
  };

  return (
    <div
      className="flex justify-between items-center px-4 py-5 w-96 rounded-sm shadow-lg bg-white z-10"
      ref={dropdownRef}
    >
      {/* 관심지역 선택 버튼 */}
      <div className="flex justify-between items-center py-2">
        <span className="text-sm">관심지역으로 검색</span>
      </div>
      <div className="relative">
        <div
          className="bg-white border border-primary-1 w-56 h-7 px-4 text-center rounded-xl items-center text-sm cursor-pointer flex justify-between"
          onClick={() => setDropdownView(!dropdownView)}
        >
          {localStorage.getItem("accessToken") !== null ? (
            <span className="text-gray-1">
              {selectedArea ? selectedArea : "관심지역 선택"}
            </span>
          ) : (
            <span className="text-gray-1">로그인 후 사용 가능합니다.</span>
          )}
          {dropdownView ? (
            <IoIosArrowUp className="text-gray-600 ml-2" />
          ) : (
            <IoIosArrowDown className="text-gray-600 ml-2" />
          )}
        </div>
        {dropdownView && (
          <ul className="absolute w-full bg-white max-h-56 overflow-auto custom-scrollbar border border-gray-2 mt-2 rounded-lg text-sm space-y-1 z-50">
            {favoriteAreas && favoriteAreas.length > 0 ? (
              favoriteAreas.map((area, index) => (
                <li
                  key={index}
                  onClick={() => handleAreaChange(area)}
                  className="px-4 py-2 hover:bg-gray-3 cursor-pointer"
                >
                  {area.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                등록된 관심지역이 없습니다
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InterestAreaSearch;
