import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLikeHouse, unLikeHouse } from "../../api/houseInfo";
import { IoHeartSharp } from "react-icons/io5";
import apt from "../../assets/imgs/apt.webp";
import { formatToEokCheon, formatToPeung } from "../../utils/methods";

const LikeApt = () => {
  const [likeHouses, setLikeHouses] = useState([]);
  const navigate = useNavigate();

  const getLikeHouses = async () => {
    try {
      const response = await fetchLikeHouse();
      setLikeHouses(response.data);
      console.log("관심 아파트", response);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const getDetail = (aptSeq) => {
    navigate(`/realprice_map/detail/${aptSeq}`);
  };

  const unLikeApt = async (aptSeq) => {
    const confirmUnLike = window.confirm("관심 매물에서 삭제하시겠습니까?");

    if (!confirmUnLike) {
      return;
    }

    try {
      const response = await unLikeHouse(aptSeq);
      getLikeHouses();
    } catch (error) {
      alert("좋아요 취소에 실패했습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    getLikeHouses();
  }, []);

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">내 관심 매물</h2>
      <div className="flex h-64 space-x-4 overflow-x-auto custom-scrollbar-big py-3 bg-gray-50 shadow-md rounded-lg w-full max-w-5xl mx-auto">
        {likeHouses.length > 0 ? (
          <div className="flex space-x-4 px-4">
            {likeHouses.map((house, index) => (
              <div
                key={house.aptSeq || index}
                className="relative w-48 p-3 h-56 bg-white rounded-lg shadow-sm text-center border border-gray-200 hover:shadow-lg"
                onClick={() => getDetail(house.aptSeq)}
              >
                <div className="relative">
                  {house.imageURL ? (
                    <img
                      className="w-full h-24 object-cover rounded-md mb-3"
                      src={house.imageURL}
                      alt="아파트 이미지"
                    />
                  ) : (
                    <img
                      src={apt}
                      className="w-full h-24 object-cover rounded-md mb-3"
                      alt="Apartment"
                    />
                  )}
                  <div className="absolute right-2 top-2">
                    <IoHeartSharp
                      className="text-lg text-primary-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        unLikeApt(house.aptSeq);
                      }}
                    />
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800 truncate mb-1">
                  매매 {formatToEokCheon(house.houseDeal.dealAmount)}
                </div>
                <h3 className="text-sm font-semibold text-gray-700 truncate mb-1">
                  {house.houseInfo.apartName}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {house.houseInfo.dongName} {house.houseInfo.roadName}{" "}
                  {house.houseInfo.roadNameBonbun}
                  {house.houseInfo.roadNameBubun
                    ? `-${house.houseInfo.roadNameBubun}`
                    : ""}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {house.houseInfo.buildYear}년 {house.houseDeal.floor}층
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {house.houseDeal.size}㎡{" "}
                  {Math.round(formatToPeung(house.houseDeal.size))}평
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10 w-full">
            관심 매물이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default LikeApt;
