import React from "react";
import PersonalInfo from "../components/mypage/personalInfo";
import Region from "../components/mypage/region";
import LikeApt from "../components/mypage/likeApt";
import LikeCharter from "../components/mypage/likeCharter";
import College from "../components/mypage/college";

const Mypage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center py-16 px-6 bg-gray-100 h-auto lg:h-auto">
      <div className="flex flex-col space-y-5">
        {/* 왼쪽 MyPage */}
        <PersonalInfo />
        {/* 관심지역 */}
        <Region />
      </div>
      <div className="flex flex-col space-y-14 w-2/3 min-w-96 mt-10 lg:mt-0 lg:w-1/2 lg:ml-10">
        <LikeApt />
        <LikeCharter type="전세" />
        <LikeCharter type="월세" />
      </div>
    </div>
  );
};

export default Mypage;
