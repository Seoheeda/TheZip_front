import React, { useState, useRef, useEffect } from "react";
import SearchBox from "./searchBox";
import Colleges from "./colleges";
import DormList from "./dormList";

const FindDorm = () => {
  const [name, setName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [collegeAddress, setCollegeAddress] = useState("");
  const [collegeList, setCollegeList] = useState([]);
  const [dormId, setDormId] = useState("");
  const containerRef = useRef(null);

  // 외부 클릭 감지용 useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // setName(""); // 외부 클릭 시 name 초기화
        setCollegeList([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full lg:w-1/2 border border-gray-2 rounded-2xl p-10 items-center bg-gradient-to-br from-white to-gray-100 shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">학교 찾기</h2>
      <div className="flex flex-col w-full" ref={containerRef}>
        <SearchBox name={name} setName={setName} setCollegeId={setCollegeId} />
        {!collegeId && name && (
          <Colleges
            setName={setName}
            name={name}
            setCollegeId={setCollegeId}
            collegeList={collegeList}
            setCollegeList={setCollegeList}
            setCollegeAddress={setCollegeAddress}
          />
        )}
      </div>
      <div className="flex flex-col 2xl:flex-row w-full min-h-96 overflow-hidden space-x-5 mt-3">
        <DormList
          name={name}
          collegeId={collegeId}
          setDormId={setDormId}
          collegeAddress={collegeAddress}
        />
      </div>
    </div>
  );
};

export default FindDorm;
