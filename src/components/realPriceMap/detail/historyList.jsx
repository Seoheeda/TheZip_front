import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAptDetail } from "../../../api/houseInfo";
import { formatToEokCheon, formatToPeung } from "../../../utils/methods";

const HistoryList = () => {
  const { aptSeq } = useParams();
  const [aptDetail, setAptDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1); // 현재 페이지 그룹의 시작 페이지
  const itemsPerPage = 5; // 페이지당 항목 수
  const pageGroupSize = 5; // 페이지 그룹 크기 (예: 5개씩 보여줌)

  const getDetail = async () => {
    try {
      const response = await getAptDetail(aptSeq);
      setAptDetail(response.data || {});
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.error("Error fetching apartment details:", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const houseDealList = aptDetail.houseDealList || [];
  const reversedHouseDealList = [...houseDealList].reverse();
  const totalItems = reversedHouseDealList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = reversedHouseDealList.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevGroup = () => {
    if (startPage > 1) {
      setStartPage(startPage - pageGroupSize);
    }
  };

  const handleNextGroup = () => {
    if (startPage + pageGroupSize <= totalPages) {
      setStartPage(startPage + pageGroupSize);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setStartPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setStartPage(
      Math.floor((totalPages - 1) / pageGroupSize) * pageGroupSize + 1,
    );
  };

  const visiblePages = Array.from(
    { length: Math.min(pageGroupSize, totalPages - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <div className="p-5 pb-10">
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-2 rounded- w-full text-sm text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border text-sm px-4 py-2">거래금액</th>
              <th className="border px-4 py-2">층</th>
              <th className="border px-2 py-2">면적 (m²)</th>
              <th className="border px-2 py-2">평수 (평)</th>
              <th className="border px-4 py-2">거래일</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((deal, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="border px-3 py-2">
                    {formatToEokCheon(deal.dealAmount)}
                  </td>
                  <td className="border px-4 py-2">{deal.floor}</td>
                  <td className="border px-4 py-2">{deal.size}</td>
                  <td className="border px-4 py-2">
                    {Math.round(formatToPeung(deal.size))}
                  </td>
                  <td className="border px-2 py-2">
                    {`${deal.dealYear}-${String(deal.dealMonth).padStart(2, "0")}-${String(
                      deal.dealDay,
                    ).padStart(2, "0")}`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  거래 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4 items-center space-x-1">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className="px-1 py-2 text-xs bg-gray-100 text-gray-600 border rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          start
        </button>
        <button
          onClick={handlePrevGroup}
          disabled={startPage === 1}
          className="px-1 py-1 bg-gray-100 text-gray-600 border rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          &lt;
        </button>
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md shadow-sm transition-all duration-300 text-sm ${
              currentPage === page
                ? "bg-primary-2 text-white font-medium"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextGroup}
          disabled={startPage + pageGroupSize > totalPages}
          className="px-1 py-1 bg-gray-100 text-gray-600 border rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          &gt;
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="px-1 py-2 text-xs bg-gray-100 text-gray-600 border rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          end
        </button>
      </div>
    </div>
  );
};

export default HistoryList;
