import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopNApt } from "../../../api/houseInfo";
import { formatToEokCheon } from "../../../utils/methods";
import { AptImageLoader } from "../../../utils/imageLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PopularApt = () => {
  const [topApt, setTopApt] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  const TOPN = 4;

  const getTopNApt = async () => {
    try {
      const response = await fetchTopNApt(TOPN);
      setTopApt(response.data);
      console.log(response.data);
    } catch (error) {
      alert("TOP 아파트 정보를 불러올 수 없습니다.");
      console.log(error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  const getAptDetail = (aptSeq) => {
    navigate(`/realprice_map/detail/${aptSeq}`);
  };

  useEffect(() => {
    getTopNApt();
  }, []);

  const renderSkeletons = () =>
    Array.from({ length: TOPN }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
      >
        <div className="h-24">
          <Skeleton height="100%" />
        </div>
        <div className="px-4 py-2">
          <Skeleton height={20} width="80%" className="mb-2" />
          <Skeleton height={15} width="60%" />
          <Skeleton height={15} width="50%" className="mt-2" />
        </div>
      </div>
    ));

  return (
    <div className="flex flex-col bg-white p-8">
      <h2 className="text-md font-bold text-center text-gray-800">실시간 가장 인기 있는 집</h2>
      <div className="grid grid-cols-2 gap-6 mt-4">
        {loading
          ? renderSkeletons()
          : topApt.map((home) => (
              <div
                key={home.aptSeq}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
                onClick={() => getAptDetail(home.aptSeq)}
              >
                <div className="h-24">
                  <AptImageLoader
                    imageURLs={home.imageURLs} // 이미지 URL 또는 기본 이미지
                    alt={home.title}
                  />
                </div>
                <div className="px-4 py-2 cursor-pointer">
                  <h3 className="truncate text-md font-bold text-gray-800">{home.apartName}</h3>
                  <p className="text-sm">{home.dongName}</p>
                  <p className="text-primary-1 text-sm mt-2">
                    매매 {formatToEokCheon(home.houseDeal.dealAmount)}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PopularApt;
