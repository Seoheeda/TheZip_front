import React, { useEffect, useState } from "react";
import { MdOutlinePlace } from "react-icons/md";
import { LuBuilding } from "react-icons/lu";
import MapCharterArea from "../charter/detail/mapCharterArea";
import { SlPicture } from "react-icons/sl";
import { getCharterDetail } from "../../api/charters";
import { formatToEokCheon, formatToPeung } from "../../utils/methods";

const AptDetail = ({ charterId }) => {
  const [houseDetail, setHouseDetail] = useState([]);
  const getDetail = async () => {
    try {
      const response = await getCharterDetail(charterId);
      setHouseDetail(response.data[0]);
      console.log(houseDetail);
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(charterId);
    if (charterId) {
      getDetail();
    }
  }, [charterId]);

  return (
    <div className="w-full max-h-[500px] h-full overflow-y-auto custom-scrollbar-big mx-auto bg-white border rounded-lg shadow-lg p-6">
      {charterId && houseDetail ? (
        <div className="flex flex-row w-full h-full space-x-5">
          <div className="flex flex-col space-y-10 w-1/2">
            <div className="w-full">
              <MapCharterArea />
            </div>
            <div className="w-full space-y-1">
              <div className="flex justify-between w-full pr-3">
                <div className="flex space-x-2 items-center">
                  <div className="text-lg">
                    서울특별시 {houseDetail.charterGu} {houseDetail.charterDong}{" "}
                    {houseDetail.name ? houseDetail.name.replace(/^\(|\)$/g, "") : ""}
                  </div>
                </div>
                <SlPicture className="text-2xl text-gray-1" />
              </div>
              <div className="flex items-center text-md">
                <MdOutlinePlace className="mr-1 text- text-primary-1" />
                <div>{houseDetail.buildingUse}</div>
              </div>
              <div className="flex items-center text-md">
                <LuBuilding className="mr-1 text-primary-1" />
                {houseDetail.size}m<sup>2</sup>&nbsp;&nbsp;
                {Math.round(formatToPeung(houseDetail.size))}평&nbsp;&nbsp;
                {houseDetail.floor}층{" "}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full mx-auto border border-gray-200 rounded-lg shadow-sm">
            <div className="py-4 px-6">
              <h3 className="text-xl font-semibold mb-4">
                {" "}
                {houseDetail.charterKind === "월세"
                  ? `${houseDetail.charterKind} ${houseDetail.rent} / ${houseDetail.deposit}`
                  : `${houseDetail.charterKind} ${formatToEokCheon(houseDetail.deposit)}`}
              </h3>
              <div className="divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <span className="text-gray-500 text-sm">층</span>
                  <span className="font-medium text-yellow-500">{houseDetail.floor}층</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-gray-500 text-sm">면적</span>
                  <span className="font-medium text-yellow-500">
                    {houseDetail.size} m<sup>2</sup>
                  </span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-gray-500 text-sm">평수</span>
                  <span className="font-medium text-yellow-500">
                    {Math.round(formatToPeung(houseDetail.size))}평
                  </span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-gray-500 text-sm">거래일</span>
                  <span className="font-medium text-yellow-500">
                    {`${houseDetail.dealYear}-${String(houseDetail.dealMonth).padStart(
                      2,
                      "0"
                    )}-${String(houseDetail.dealDay).padStart(2, "0")}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 font-medium mt-8">
          <span className="block text-xl font-bold text-gray-800 mb-2">집을 선택하세요!</span>
          선택된 집이 없어요. 위에서 집을 선택해 정보를 확인해보세요. 🏠
        </p>
      )}
    </div>
  );
};

export default AptDetail;
