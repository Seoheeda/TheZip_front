import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopNApt } from "../../api/houseInfo";
import { fetchTopNCharter } from "../../api/charters";
import { formatToEokCheon } from "../../utils/methods";
import { AptImageLoader, CharterImageLoader } from "../../utils/imageLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Populars = () => {
  const [topApt, setTopApt] = useState([]);
  const [topCharterYearly, setTopCharterYearly] = useState([]);
  const [topCharterMonthly, setTopCharterMonthly] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  const TOPN = 2;

  const getTopNApt = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await fetchTopNApt(TOPN);
      setTopApt(response.data);
    } catch (error) {
      alert("TOP 아파트 정보를 불러올 수 없습니다.");
      console.log(error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const getTopNCharter = async (charterKind) => {
    try {
      const response = await fetchTopNCharter(charterKind, 4);
      if (charterKind === "전세") {
        setTopCharterYearly(response.data);
      } else {
        setTopCharterMonthly(response.data);
      }
    } catch (error) {
      alert("TOP 전/월세 정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  const getAptDetail = (aptSeq) => {
    navigate(`/realprice_map/detail/${aptSeq}`);
  };

  const getCharterDetail = (charterId) => {
    navigate(`/charters/detail/${charterId}`);
  };

  useEffect(() => {
    Promise.all([getTopNApt(), getTopNCharter("전세"), getTopNCharter("월세")]);
  }, []);

  const renderSkeletons = () =>
    Array.from({ length: TOPN }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg md:w-1/2 lg:w-full"
      >
        <div className="h-32">
          <Skeleton height="100%" />
        </div>
        <div className="p-4">
          <Skeleton height={20} width="80%" className="mb-2" />
          <Skeleton height={15} width="50%" />
        </div>
      </div>
    ));

  return (
    <div className="flex flex-col w-full items-center my-16">
      <h2 className="text-xl font-bold text-gray-800">
        실시간 가장 인기 있는 집
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5 w-full">
        {/* 첫 번째 세트 */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-6">
          {isLoading
            ? renderSkeletons()
            : topApt.map((home) => (
                <div
                  key={home.aptSeq}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all md:w-1/2 lg:w-full"
                  onClick={() => getAptDetail(home.aptSeq)}
                >
                  <div className="h-32">
                    <AptImageLoader
                      imageURLs={home.imageURLs}
                      alt={home.title}
                    />
                  </div>
                  <div className="p-4 cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-800">
                      {home.apartName}
                    </h3>
                    <p className="text-primary-1 text-md mt-2">
                      매매 {formatToEokCheon(home.houseDeal.dealAmount)}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* 두 번째 세트 */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-6">
          {isLoading
            ? renderSkeletons()
            : topCharterYearly.map((home) => (
                <div
                  key={home.charterId + "_2"}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all md:w-1/2 lg:w-full"
                  onClick={() => getCharterDetail(home.charterId)}
                >
                  <div className="h-32">
                    <CharterImageLoader
                      imageURLs={home.image}
                      alt={home.title}
                    />
                  </div>
                  <div className="p-4 cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-800">
                      {home.name}
                    </h3>
                    <p className="text-primary-1 text-md mt-2">
                      전세 {formatToEokCheon(home.deposit)}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* 세 번째 세트 */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-6">
          {isLoading
            ? renderSkeletons()
            : topCharterMonthly.map((home) => (
                <div
                  key={home.charterId + "_3"}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all md:w-1/2 lg:w-full"
                  onClick={() => getCharterDetail(home.charterId)}
                >
                  <div className="h-32">
                    <CharterImageLoader
                      imageURLs={home.image}
                      alt={home.title}
                    />
                  </div>
                  <div className="p-4 cursor-pointer">
                    <h3 className="truncate text-lg font-bold text-gray-800">
                      {home.name}
                    </h3>
                    <p className="text-primary-1 text-md mt-2">
                      {home.rent} / {home.deposit}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Populars;
