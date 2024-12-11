import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCharterDetail } from "../../../api/charters";
import { formatToEokCheon, formatToPeung, formatFloor } from "../../../utils/methods";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HistoryList = () => {
  const { charterId } = useParams();
  const [charterDetail, setCharterDetail] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const getDetail = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await getCharterDetail(charterId);
      setCharterDetail(response.data[0]);
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.error("Error fetching apartment details:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-8 text-gray-800 text-center">실거래가 정보</h2>
      {loading ? (
        <div className="max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm">
          <div className="py-4 px-6">
            <Skeleton height={24} width="80%" />
            <div className="divide-y divide-gray-200 mt-4">
              <div className="py-3 flex justify-between">
                <Skeleton height={16} width="30%" />
                <Skeleton height={16} width="40%" />
              </div>
              <div className="py-3 flex justify-between">
                <Skeleton height={16} width="30%" />
                <Skeleton height={16} width="40%" />
              </div>
              <div className="py-3 flex justify-between">
                <Skeleton height={16} width="30%" />
                <Skeleton height={16} width="40%" />
              </div>
              <div className="py-3 flex justify-between">
                <Skeleton height={16} width="30%" />
                <Skeleton height={16} width="40%" />
              </div>
            </div>
          </div>
        </div>
      ) : charterDetail ? (
        <div className="max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm">
          <div className="py-4 px-6">
            <h3 className="text-xl font-semibold mb-4">
              {charterDetail.charterKind === "월세"
                ? `${charterDetail.charterKind} ${charterDetail.rent} / ${charterDetail.deposit}`
                : `${charterDetail.charterKind} ${formatToEokCheon(charterDetail.deposit)}`}
            </h3>
            <div className="divide-y divide-gray-200">
              <div className="py-3 flex justify-between">
                <span className="text-gray-500 text-sm">층</span>
                <span className="font-medium text-yellow-500">
                  {formatFloor(charterDetail.floor)}
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500 text-sm">면적</span>
                <span className="font-medium text-yellow-500">
                  {charterDetail.size} m<sup>2</sup>
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500 text-sm">평수</span>
                <span className="font-medium text-yellow-500">
                  {Math.round(formatToPeung(charterDetail.size))}평
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500 text-sm">거래일</span>
                <span className="font-medium text-yellow-500">
                  {`${charterDetail.dealYear}-${String(charterDetail.dealMonth).padStart(
                    2,
                    "0"
                  )}-${String(charterDetail.dealDay).padStart(2, "0")}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">데이터를 불러오는 데 실패했습니다.</div>
      )}
    </div>
  );
};

export default HistoryList;
