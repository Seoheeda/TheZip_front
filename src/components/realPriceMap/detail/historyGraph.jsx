import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { getAptDetail } from "../../../api/houseInfo";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const HistoryGraph = () => {
  const { aptSeq } = useParams();
  const [aptDetail, setAptDetail] = useState({});
  const [chartData, setChartData] = useState(null); // 차트 데이터 상태
  const [isLastYear, setIsLastYear] = useState(false); // 최근 1년 데이터 여부
  const [noData, setNoData] = useState(false); // 데이터가 없을 때 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const getDetail = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await getAptDetail(aptSeq);
      const aptData = response.data || {};
      setAptDetail(aptData);

      let houseDealList = aptData.houseDealList || [];

      if (!isLastYear) {
        if (houseDealList.length > 1000) {
          houseDealList = houseDealList.filter((_, index) => index % 25 === 0);
        } else if (houseDealList.length > 300) {
          houseDealList = houseDealList.filter((_, index) => index % 10 === 0);
        } else if (houseDealList.length > 50) {
          houseDealList = houseDealList.filter((_, index) => index % 2 === 0);
        }

        const lastDeal =
          aptData.houseDealList[aptData.houseDealList.length - 1];
        if (!houseDealList.includes(lastDeal)) {
          houseDealList.push(lastDeal);
        }
      }

      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 3);

      if (isLastYear) {
        houseDealList = houseDealList.filter((deal) => {
          const dealDate = new Date(
            `${deal.dealYear}-${String(deal.dealMonth).padStart(2, "0")}-${String(
              deal.dealDay,
            ).padStart(2, "0")}`,
          );
          return dealDate >= oneYearAgo;
        });
      }

      if (houseDealList.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
        const labels = houseDealList.map(
          (deal) =>
            `${deal.dealYear}-${String(deal.dealMonth).padStart(2, "0")}-${String(
              deal.dealDay,
            ).padStart(2, "0")}`,
        );
        const data = houseDealList.map((deal) =>
          deal.dealAmount ? parseInt(deal.dealAmount.replace(",", ""), 10) : 0,
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "거래금액 (만원)",
              data,
              borderColor: "#E3C04D",
              backgroundColor: "white",
              tension: 0.1,
              pointRadius: 2,
            },
          ],
        });
      }
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.error("Error fetching apartment details:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const toggleLastYear = () => {
    setIsLastYear((prev) => !prev);
  };

  useEffect(() => {
    getDetail();
  }, [isLastYear]);

  return (
    <div className="p-5 my-3">
      <div className="flex justify-between">
        <h2 className="text-md font-semibold mb-3">실거래가</h2>
        <div
          onClick={toggleLastYear}
          className={`text-xs bg-primary-2 rounded-2xl text-white py-1 px-3 h-6 cursor-pointer flex items-center`}
        >
          {isLastYear ? "전체 기간 보기" : "최근 3년 보기"}
        </div>
      </div>
      <div className="w-full">
        {noData ? (
          <div className="w-full h-32 border border-gray-2 rounded-md flex items-center justify-center bg-gray-100">
            <div className="text-md text-gray-500">
              최근 3년동안 거래내역이 없습니다.
            </div>
          </div>
        ) : chartData ? (
          <div className="w-full h-56 p-3 border border-gray-2 rounded-md flex items-center justify-center">
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: false,
                      text: "거래 날짜",
                    },
                  },
                  y: {
                    title: {
                      display: false,
                      text: "거래금액 (만원)",
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default HistoryGraph;
