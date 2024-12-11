import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopNCharter } from "../../../api/charters";
import { formatToEokCheon } from "../../../utils/methods";
import { CharterImageLoader } from "../../../utils/imageLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PopularCharter = () => {
  const [topCharterYearly, setTopCharterYearly] = useState([]);
  const [topCharterMonthly, setTopCharterMonthly] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const TOPN = 4;

  const getTopNCharter = async (charterKind) => {
    try {
      const response = await fetchTopNCharter(charterKind, TOPN);
      if (charterKind === "전세") {
        setTopCharterYearly(response.data);
      } else {
        setTopCharterMonthly(response.data);
      }
    } catch (error) {
      alert("TOP 전/월세 정보를 불러올 수 없습니다.");
      console.log(error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  const getCharterDetail = (charterId) => {
    navigate(`/charters/detail/${charterId}`);
  };

  useEffect(() => {
    Promise.all([getTopNCharter("전세"), getTopNCharter("월세")]);
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
        <div className="px-3 py-2">
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
        {loading ? (
          renderSkeletons()
        ) : (
          <>
            {topCharterYearly.map((home) => (
              <div
                key={home.charterId}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
                onClick={() => getCharterDetail(home.charterId)}
              >
                <div className="h-24">
                  <CharterImageLoader imageURLs={home.image} alt={home.title} />
                </div>
                <div className="px-3 py-2 cursor-pointer">
                  <h3 className="truncate text-md font-bold text-gray-800">{home.name}</h3>
                  <p className="text-sm">{home.charterDong}</p>
                  <p className="text-primary-1 text-sm mt-2">
                    전세 {formatToEokCheon(home.deposit)}
                  </p>
                </div>
              </div>
            ))}
            {topCharterMonthly.map((home) => (
              <div
                key={home.charterId}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
                onClick={() => getCharterDetail(home.charterId)}
              >
                <div className="h-24">
                  <CharterImageLoader imageURLs={home.image} alt={home.title} />
                </div>
                <div className="px-3 py-2 cursor-pointer">
                  <h3 className="truncate text-md font-bold text-gray-800">{home.name}</h3>
                  <p className="text-sm">{home.charterDong}</p>
                  <p className="text-primary-1 text-sm mt-2">
                    {home.rent} / {home.deposit}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PopularCharter;
