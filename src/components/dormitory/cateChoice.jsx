import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { COMPARE_OPTIONS } from "../../utils/enum";

const CateChoice = ({ option, setOption, setDropdownViewHouse }) => {
  const [dropdownView, setDropdownView] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownView(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (i) => {
    setOption(i);
    setDropdownView(false);
    setDropdownViewHouse(true);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full h-14 px-5 text-center rounded-xl cursor-pointer flex justify-between items-center shadow-md border ${
          dropdownView ? "border-primary-1" : "border-gray-200"
        }`}
        onClick={() => setDropdownView(!dropdownView)}
      >
        {option > -1 ? (
          <p className="truncate">{COMPARE_OPTIONS[option]}</p>
        ) : (
          <p className="truncate">옵션 선택하기</p>
        )}
        {dropdownView ? (
          <IoIosArrowUp className="text-primary-1 text-lg" />
        ) : (
          <IoIosArrowDown className="text-primary-1 text-lg" />
        )}
      </div>

      {dropdownView && (
        <ul className="absolute bg-white max-h-64 w-full overflow-auto custom-scrollbar border border-gray-2 mt-2 rounded-lg text-sm space-y-1 z-50 shadow-lg">
          {COMPARE_OPTIONS.map((opt, i) => (
            <li
              key={i}
              className="w-full h-6 hover:bg-gray-3 px-4 py-5 flex items-center cursor-pointer text-md"
              onClick={() => handleSelectOption(i)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CateChoice;
