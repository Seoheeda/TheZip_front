import React, { useEffect, useState } from "react";
import AreaDropdown from "./areaDropdown";
import {
  addInterestArea,
  getInterestArea,
  deleteInterestArea as deleteInterestAPI,
} from "../../api/interest";

const Region = () => {
  const [dongCode, setDongCode] = useState("");
  const [area, setArea] = useState({ sido: null, gugun: null, dong: null });
  const [interestArea, setInterestArea] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // 펼치기/접기 상태

  const fetchInterestArea = async () => {
    try {
      const response = await getInterestArea();
      console.log("관심지역 조회", response);
      setInterestArea(response.data);
    } catch (error) {
      alert("관심지역을 조회할 수 없습니다.");
      console.log(error);
    }
  };

  const postInterestArea = async () => {
    try {
      const response = await addInterestArea(dongCode);
      console.log("관심지역 추가", response);
      fetchInterestArea(); // 추가 후 관심지역 새로고침
    } catch (error) {
      alert("관심지역을 추가할 수 없습니다.");
      console.log(error);
    }
  };

  const handleDeleteInterestArea = async (interestAreaId) => {
    try {
      const response = await deleteInterestAPI(interestAreaId);
      console.log("관심지역 삭제", response);
      fetchInterestArea(); // 삭제 후 관심지역 새로고침
    } catch (error) {
      alert("관심지역을 삭제할 수 없습니다.");
      console.log(error);
    }
  };

  const clickBtn = () => {
    if (interestArea.length >= 5) {
      alert("관심 지역은 최대 5개까지만 등록 가능합니다.");
      return;
    }

    console.log(dongCode);
    postInterestArea(dongCode);
    setArea({ sido: null, gugun: null, dong: null });
    setDongCode("");
  };

  useEffect(() => {
    fetchInterestArea();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // 펼치기/접기 상태 반전
  };

  return (
    <div className="bg-white w-full sm:w-96 shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">내 관심 지역</h3>
      <AreaDropdown dongCode={dongCode} setDongCode={setDongCode} area={area} setArea={setArea} />
      <div className="flex items-center">
        <input
          type="text"
          placeholder="관심지역 추가하기"
          value={`${area.sido || ""} ${area.gugun || ""} ${area.dong || ""}`}
          readOnly
          className="flex-grow text-sm px-2 py-1 border rounded-md shadow-sm sm:text-sm"
        />
        <button
          className="ml-2 text-sm bg-primary-2 text-white px-4 py-1 rounded-md hover:bg-primary-3"
          onClick={clickBtn}
        >
          확인
        </button>
      </div>

      <button
        onClick={toggleExpand}
        className="mt-4 text-sm text-primary-2 underline hover:text-primary-3"
      >
        {isExpanded ? "접기" : "펼치기"}
      </button>

      {isExpanded && (
        <ul className="flex flex-col space-y-2 mt-4">
          {interestArea.length > 0 ? (
            interestArea.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 text-sm px-4 py-2 rounded-lg shadow-sm"
              >
                <span>{item.name}</span>
                <button
                  onClick={() => {
                    handleDeleteInterestArea(item.interestAreaId);
                  }}
                  className="ml-4 text-xs text-red-600 hover:text-red-800"
                >
                  삭제
                </button>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500 text-center">관심 지역이 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Region;
