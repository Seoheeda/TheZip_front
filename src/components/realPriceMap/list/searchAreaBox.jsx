import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { getAreaName } from "../../../api/houseInfo";

const SearchAreaBox = () => {
  const [searchedSido, setSearchedSido] = useState("");
  const [searchedGugun, setSearchedGugun] = useState("");
  const [searchedDong, setSearchedDong] = useState("");

  const { dongCode } = useParams();

  const fetchAreaName = async () => {
    try {
      const response = await getAreaName(dongCode);
      setSearchedSido(response.data.sido);
      setSearchedGugun(response.data.gugun);
      setSearchedDong(response.data.dong);
      console.log("지역명", response.data);
    } catch (error) {
      console.log("지역명 검색에 실패했습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreaName();
  }, []);

  return (
    <div className="h-20 border-b-2 px-5 py-2 flex flex-col">
      <div
        className="flex flex-row items-center h-10 cursor-pointer text-primary-1"
        onClick={() => {
          window.history.back(); // 페이지 뒤로 이동
        }}
      >
        <MdArrowBackIos />
        <div className="pl-2">다른 지역 검색하기</div>
      </div>
      <div className="flex">
        <p className="text-base ">
          {searchedSido} {searchedGugun} {searchedDong}
        </p>
        <p className="text-gray-600">&nbsp;에 대한 검색결과</p>
      </div>
    </div>
  );
};

export default SearchAreaBox;
