import React, { useEffect, useState } from "react";
import { fetchDormDetail } from "../../api/dormitory";

const DormDetail = ({ dormId }) => {
  const [dormDetail, setDormDetail] = useState([]);

  const getDormDetail = async () => {
    try {
      const response = await fetchDormDetail(dormId);
      setDormDetail(response.data);
      console.log("기숙사 상세", response.data);
    } catch (error) {
      alert("정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (dormId !== "") {
      getDormDetail();
    }
  }, [dormId]);

  return (
    <div className="w-full 2xl:w-1/2 overflow-y-scroll custom-scrollbar-big mx-auto bg-white border rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 ml-2">기숙사 상세</h2>
      {dormDetail.length !== 0 ? (
        <ul className="space-y-6">
          <li
            key={dormDetail.dormitoryId}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {dormDetail.name}
            </h3>
            <table className="min-w-full table-auto text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    종류
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {dormDetail.dormitoryKind}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    방 번호
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {dormDetail.roomNumber}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    수용 인원
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {dormDetail.capacity}명
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    월세
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {dormDetail.rent.toLocaleString()}원
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    관리비
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {dormDetail.maintenance.toLocaleString()}원
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    보증금
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {dormDetail.deposit.toLocaleString()}원
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    연간 총 비용
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {dormDetail.yearlyRent.toLocaleString()}원
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      ) : (
        <p className="text-gray-500">선택된 기숙사가 없습니다.</p>
      )}
    </div>
  );
};

export default DormDetail;
