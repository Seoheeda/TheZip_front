import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLikeCharter, unLikeCharter } from "../../api/charters";
import { IoHeartSharp } from "react-icons/io5";
import { formatToEokCheon, formatToPeung } from "../../utils/methods";
import { CharterImageLoader } from "../../utils/imageLoader";

const LikeCharter = ({ type }) => {
  const [likeCharters, setLikeCharters] = useState([]);
  const navigate = useNavigate();

  const getLikeCharters = async () => {
    try {
      const response = await fetchLikeCharter(type);
      setLikeCharters(response.data);
      console.log("관심 전/월세", response);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const getDetail = (aptSeq) => {
    navigate(`/charters/detail/${aptSeq}`);
  };

  const unLikeHome = async (charterId) => {
    const confirmUnLike = window.confirm("관심 매물에서 삭제하시겠습니까?");

    if (!confirmUnLike) {
      return;
    }

    try {
      const response = await unLikeCharter(charterId);
      getLikeCharters();
    } catch (error) {
      alert("좋아요 취소에 실패했습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    getLikeCharters();
  }, []);

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">내 관심 {type}</h2>
      <div className="flex h-64 space-x-4 overflow-x-auto custom-scrollbar-big py-3 bg-gray-50 shadow-md rounded-lg w-full max-w-5xl mx-auto">
        {likeCharters.length > 0 ? (
          <div className="flex space-x-4 px-4">
            {likeCharters.map((charter, index) => (
              <div
                key={charter.charterId || index}
                className="relative w-48 p-3 h-56 bg-white rounded-lg shadow-sm text-center border border-gray-200 hover:shadow-lg"
                onClick={() => getDetail(charter.charterId)}
              >
                <div className="relative">
                  <div className="w-full h-24 rounded-md mb-3">
                    <div className="rounded-md w-full h-24">
                      <CharterImageLoader
                        imageURLs={charter.image} // 이미지 URL 또는 기본 이미지
                        alt={charter.title}
                        rounded={true}
                      />
                    </div>
                  </div>
                  <div className="absolute right-2 top-2">
                    <IoHeartSharp
                      className="text-lg text-primary-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        unLikeHome(charter.charterId);
                      }}
                    />
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800 truncate mb-1">
                  {type === "월세" ? (
                    <div>
                      {type} {charter.rent} / {charter.deposit}
                    </div>
                  ) : (
                    <div>
                      {type} {formatToEokCheon(charter.deposit)}
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-gray-700 truncate mb-1">
                  {charter.charterDong} {charter.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {charter.charterGu} {charter.charterDong} {charter.bonbun}
                  {charter.bubun ? `-${charter.bubun}` : ""}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {charter.constructionYear}년 {charter.floor}층
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {charter.size}㎡ {Math.round(formatToPeung(charter.size))}평
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10 w-full">관심 매물이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default LikeCharter;
