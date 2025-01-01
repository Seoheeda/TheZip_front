import React, { useEffect, useState } from "react";
import { fetchDormList } from "../../api/dormitory";
import { getAreaList } from "../../api/houseInfo";
import { useNavigate } from "react-router-dom";

const DormList = ({ name, collegeId, setDormId, collegeAddress }) => {
  const [dormList, setDormList] = useState([]);
  const [originalDormList, setOriginalDormList] = useState([]); // 원본 데이터 저장
  const [isFiltered, setIsFiltered] = useState(false); // 필터링 상태
  const navigate = useNavigate();

  const getDormList = async () => {
    try {
      console.log("아이디바뀜", collegeId);
      const response = await fetchDormList(collegeId);
      setDormList(response.data);
      setOriginalDormList(response.data); // 원본 데이터 저장
      console.log("기숙사 리스트", response.data);
    } catch (error) {
      alert("정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  const onselectDorm = (dormId) => {
    setDormId(dormId);
  };

  const getList = async (sido, gugun, dong) => {
    try {
      const response = await getAreaList(sido, gugun, dong);
      navigate(`/charters/college/${name}/${response.data}`);
    } catch (error) {
      alert("리스트를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  const onClickSearch = () => {
    console.log(collegeAddress);
    const cityRegex = /([가-힣]+(?:특별시|광역시|도))/;
    const gugunRegex = /([가-힣]+(?:구|군))/;
    const dongRegex = /([가-힣]+동(?!로)[\d]*[가-힣]*)(?=\s|,|$)/;

    const cityMatch = collegeAddress.match(cityRegex);
    const city = cityMatch ? cityMatch[1] : "";

    const gugunMatch = collegeAddress.match(gugunRegex);
    const gugun = gugunMatch ? gugunMatch[1] : "";

    const dongMatch = collegeAddress.match(dongRegex);
    const dong = dongMatch ? dongMatch[1] : "";
    console.log(dong);

    getList(city, gugun, dong);
  };

  const onFilterToggle = () => {
    if (isFiltered) {
      // 필터링 해제
      setDormList(originalDormList);
    } else {
      // "대학생" 필터링
      const filteredList = originalDormList.filter(
        (dorm) => dorm.dormitoryKind === "대학생",
      );
      setDormList(filteredList);
    }
    setIsFiltered(!isFiltered); // 상태 토글
  };

  const onSortByLowPrice = () => {
    const sortedList = [...dormList].sort(
      (a, b) => a.yearlyRent - b.yearlyRent,
    );
    setDormList(sortedList);
  };

  const onSortByHighPrice = () => {
    const sortedList = [...dormList].sort(
      (a, b) => b.yearlyRent - a.yearlyRent,
    );
    setDormList(sortedList);
  };

  useEffect(() => {
    if (collegeId !== "") {
      getDormList();
    }
  }, [collegeId]);

  useEffect(() => {
    if (name === "") {
      setDormList([]);
    }
  }, [name]);

  return (
    <div className="relative w-full max-h-[500px] h-full overflow-y-auto custom-scrollbar-big mx-auto bg-white border rounded-lg shadow-lg p-6">
      {dormList.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="col-span-full text-xl font-semibold mb-4 ml-2">
            기숙사 목록
          </h2>
          <div className="absolute top-3 right-3 flex space-x-3">
            <div
              className="px-3 py-1 mt-2 border border-primary-1 self-end rounded-md cursor-pointer hover:bg-primary-5"
              onClick={onFilterToggle}
            >
              {isFiltered ? "전체보기" : "학생만"}
            </div>
            <div
              className="px-3 py-1 mt-2 border border-primary-1 self-end rounded-md cursor-pointer hover:bg-primary-5"
              onClick={onSortByLowPrice}
            >
              가격 낮은 순
            </div>

            <div
              className="px-3 py-1 mt-2 border border-primary-1 self-end rounded-md cursor-pointer hover:bg-primary-5"
              onClick={onSortByHighPrice}
            >
              가격 높은 순
            </div>
            <div
              className=" px-3 py-1 mt-2 bg-primary-3 self-end rounded-md cursor-pointer hover:bg-primary-4"
              onClick={onClickSearch}
            >
              학교 주변 매물 보기
            </div>
          </div>
          {dormList.map((dorm) => (
            <li
              key={dorm.dormitoryId}
              className="bg-white border h-full border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => onselectDorm(dorm.dormitoryId)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {dorm.name}
              </h3>
              <table className="min-w-full table-auto text-lg">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-600">
                      종류
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {dorm.dormitoryKind}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-600">
                      방 번호
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {dorm.roomNumber}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-600">
                      수용 인원
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {dorm.capacity}명
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-600">
                      월세
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {dorm.rent.toLocaleString()}원
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-600">
                      관리비
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {dorm.maintenance.toLocaleString()}원
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-600">
                      보증금
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {dorm.deposit.toLocaleString()}원
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-600">
                      연간 총 비용
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      {dorm.yearlyRent.toLocaleString()}원
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      )}
      {collegeId === "" && (
        <p className="text-center text-gray-600 font-medium mt-8">
          <span className="block text-xl font-bold text-gray-800 mb-2">
            학교를 선택하세요!
          </span>
          선택된 학교가 없어요. 위에서 학교를 선택해 기숙사 정보를 확인해보세요.
          🏫
        </p>
      )}
      {collegeId !== "" && dormList.length === 0 && (
        <p className="text-center text-gray-600 font-medium mt-8">
          <span className="block text-xl font-bold text-gray-800 mb-2">
            기숙사 정보가 없어요!
          </span>
          기숙사 정보가 없어요. 학교 주변 월세/전세 정보를 확인해보세요. 🏫
          <div
            className="absolute bottom-5 right-3 px-3 py-1 mt-2 bg-primary-3 self-end rounded-md cursor-pointer hover:bg-primary-4"
            onClick={onClickSearch}
          >
            학교 주변 매물 보기
          </div>
        </p>
      )}
    </div>
  );
};

export default DormList;
