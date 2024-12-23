import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { getAreaList } from "../../../api/houseInfo";
import { useNavigate } from "react-router-dom";

const AreaDropdown = () => {
  const [area, setArea] = useState({ sido: null, gugun: null, dong: null });
  const [sidoList, setSidoList] = useState([]);
  const [gugunList, setGugunList] = useState([]);
  const [dongList, setDongList] = useState([]);
  const [dongCode, setDongCode] = useState("");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [dropdownView, setDropdownView] = useState({
    city: false,
    district: false,
    neighborhood: false,
  });

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownView({ city: false, district: false, neighborhood: false });
    }
  };

  const getList = async () => {
    try {
      const response = await getAreaList(area.sido, area.gugun, area.dong);
      console.log(dongCode);
      console.log(response.data);
      if (area.sido === null) {
        setSidoList(response.data);
      } else if (area.gugun === null) {
        setGugunList(response.data);
      } else if (area.dong === null) {
        setDongList(response.data);
      } else {
        setDongCode(response.data);
        navigate(`/realprice_map/dong/${response.data}`);
      }
    } catch (error) {
      alert("리스트를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  const handleSelectSido = async (sidoName) => {
    setArea({ sido: sidoName, gugun: null, dong: null });
    setGugunList([]);
    setDongList([]);
    setDropdownView({ city: false, district: true, neighborhood: false });
  };

  const handleSelectGugun = async (gugunName) => {
    setArea((prev) => ({ ...prev, gugun: gugunName, dong: null }));
    setDongList([]);
    setDropdownView({ city: false, district: false, neighborhood: true });
  };

  const handleSelectDong = async (dongName) => {
    setArea((prev) => ({ ...prev, dong: dongName }));
    setDropdownView({ city: false, district: false, neighborhood: false });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // 시도, 구군, 동 중 하나라도 선택된 경우에만 `getList` 호출
    if (area.sido !== null && area.gugun === null && area.dong === null) {
      getList(); // 시도 리스트를 불러올 때
    } else if (area.gugun !== null && area.dong === null) {
      getList(); // 구군 리스트를 불러올 때
    } else if (area.dong !== null) {
      getList(); // 동 리스트를 불러올 때
    }
  }, [area, dongCode]);

  return (
    <div className="flex w-full p-3 space-x-2 justify-center" ref={dropdownRef}>
      <div className="bg-primary-4 w-28 h-7 px-1 text-center rounded-xl items-center cursor-pointer">
        <div
          onClick={() => {
            setArea({ sido: null, gugun: null, dong: null });
            getList();
            setDropdownView({
              city: !dropdownView.city,
              district: false,
              neighborhood: false,
            });
          }}
        >
          <div className="flex flex-row justify-center items-center pt-0.5">
            {area.sido === null ? (
              <p>시 / 도</p>
            ) : (
              <p className="truncate max-w-[100px]">{area.sido}</p>
            )}
            {dropdownView.city ? (
              <IoIosArrowUp className=" text-gray-600 ml-2" />
            ) : (
              <IoIosArrowDown className=" text-gray-600 ml-2" />
            )}
          </div>
        </div>
        {dropdownView.city && (
          <ul className="bg-white max-h-56 overflow-auto custom-scrollbar border border-gray-2 mt-3 rounded-lg text-sm space-y-1 z-50 relative">
            {sidoList.map((sidoName, i) => (
              <li
                key={sidoName}
                onClick={() => {
                  handleSelectSido(sidoName);
                }}
                className="w-full h-6 hover:bg-gray-3"
              >
                {sidoName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-primary-4 w-28 h-7 px-1 text-center rounded-xl items-center cursor-pointer">
        <div
          onClick={() => {
            setArea((prev) => ({ ...prev, dong: null }));
            setDropdownView({
              city: false,
              district: !dropdownView.district,
              neighborhood: false,
            });
          }}
        >
          <div className="flex flex-row justify-center items-center pt-0.5">
            {area.gugun === null ? (
              <p>구 / 군</p>
            ) : (
              <p className="truncate max-w-[100px]">{area.gugun}</p>
            )}

            {dropdownView.district ? (
              <IoIosArrowUp className=" text-gray-600 ml-2" />
            ) : (
              <IoIosArrowDown className=" text-gray-600 ml-2" />
            )}
          </div>
        </div>

        {dropdownView.district && (
          <ul className="bg-white  max-h-56 overflow-auto custom-scrollbar border border-gray-2 mt-3 rounded-lg text-sm space-y-1 z-50 relative">
            {gugunList.length > 0 ? (
              gugunList.map((gugunName, i) => (
                <li
                  key={gugunName}
                  onClick={() => handleSelectGugun(gugunName)}
                  className="w-full h-6 hover:bg-gray-3"
                >
                  {gugunName}
                </li>
              ))
            ) : (
              <li>시/도 선택하기</li>
            )}
          </ul>
        )}
      </div>
      <div className="bg-primary-4 w-28 h-7 px-1 text-center rounded-xl items-center cursor-pointer">
        <div
          onClick={() => {
            setDropdownView({
              city: false,
              district: false,
              neighborhood: !dropdownView.neighborhood,
            });
          }}
        >
          <div className="flex flex-row justify-center items-center pt-0.5">
            {area.dong === null ? (
              <p>동</p>
            ) : (
              <p className="truncate max-w-[100px]">{area.dong}</p>
            )}
            {dropdownView.neighborhood ? (
              <IoIosArrowUp className=" text-gray-600 ml-2" />
            ) : (
              <IoIosArrowDown className=" text-gray-600 ml-2" />
            )}
          </div>
        </div>
        {dropdownView.neighborhood && (
          <ul className="bg-white max-h-56 overflow-auto custom-scrollbar border border-gray-2 mt-3 rounded-lg text-sm space-y-1 z-50 relative">
            {dongList.length > 0 ? (
              dongList.map((dongName, i) => (
                <li
                  key={dongName}
                  onClick={() => handleSelectDong(dongName)}
                  className="w-full h-6 hover:bg-gray-3"
                >
                  {dongName}
                </li>
              ))
            ) : (
              <li>구/군을 선택하기</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AreaDropdown;
