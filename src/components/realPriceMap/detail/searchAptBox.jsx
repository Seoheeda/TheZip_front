import React from "react";
import { MdArrowBackIos } from "react-icons/md";

const SearchAptBox = ({ apartName }) => {
  return (
    <div className="h-20 border-b-2 px-5 py-2 flex flex-col">
      <div
        className="flex flex-row items-center h-10 cursor-pointer text-primary-1"
        onClick={() => {
          window.history.back(); // 페이지 뒤로 이동
        }}
      >
        <MdArrowBackIos />
        <div className="pl-2">다른 아파트 보기</div>
      </div>
      <div className="flex">
        <p className="text-base ">{apartName} </p>
        <p className="text-gray-600">&nbsp;에 대한 검색결과</p>
      </div>
    </div>
  );
};

export default SearchAptBox;
