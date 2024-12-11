import React, { useEffect } from "react";
import { fetchCollegeInfo } from "../../api/dormitory";

const Colleges = ({
  name,
  setName,
  setCollegeId,
  collegeList,
  setCollegeList,
  setCollegeAddress,
}) => {
  const getCollegeInfo = async (name) => {
    try {
      const response = await fetchCollegeInfo(name);
      setCollegeList(response.data);
      console.log(response.data);
    } catch (error) {
      alert("정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  const onselectCollege = (college) => {
    setName(college.collegeName);
    setCollegeId(college.collegeId);
    setCollegeAddress(college.roadAddress);
  };

  useEffect(() => {
    console.log(name);
    if (name === "") {
      setCollegeList([]);
      return;
    }
    getCollegeInfo(name);
  }, [name]);

  return (
    <div className="relative w-full mt-0">
      {collegeList.length > 0 && (
        <ul className="absolute w-full rounded-lg z-10 overflow-y-auto custom-scrollbar bg-white shadow-lg max-h-96">
          {collegeList.map((college) => (
            <li
              key={college.collegeId}
              className="px-6 py-4 mb-2 hover:bg-primary-4 bg-white cursor-pointer text-sm flex flex-col rounded-lg border border-gray-200 shadow-md transition-all duration-200"
              onClick={() => onselectCollege(college)}
            >
              <div className="font-bold text-gray-700 text-base">{college.collegeName}</div>
              <div className="text-xs text-gray-500 italic">{college.collegeEnglishName}</div>
              <div className="text-sm text-gray-600 mt-1">
                지역: {college.regionName} | {college.branchType}
              </div>
              <div className="text-xs text-gray-400 mt-1">{college.roadAddress}</div>
              <a
                href={`https://${college.homePage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-1 text-xs mt-2 underline"
              >
                {college.homePage}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Colleges;
