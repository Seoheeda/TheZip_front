import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBox = ({ name, setName, setCollegeId }) => {
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  return (
    <div className="relative w-full">
      <input
        value={name}
        onChange={onNameChange}
        onFocus={() => setCollegeId("")}
        className="h-14 w-full pr-12 pl-5 my-3 text-lg rounded-lg focus:ring-2 focus:ring-primary-2 focus:outline-none border border-gray-200 shadow-md "
        placeholder="학교 이름을 입력하세요..."
      />
      <IoSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-3xl text-primary-2" />
    </div>
  );
};

export default SearchBox;
