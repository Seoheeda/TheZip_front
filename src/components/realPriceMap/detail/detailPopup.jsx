import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAptDetail } from "../../../api/houseInfo";
import SearchAptBox from "./searchAptBox";
import MapAptArea from "./mapAptArea";
import AptInfo from "./aptInfo";
import HistoryList from "./historyList";
import HistoryGraph from "./historyGraph";

const DetailPopup = () => {
  const { aptSeq } = useParams();
  const [aptDetail, setAptDetail] = useState([]);

  const getDetail = async () => {
    try {
      const response = await getAptDetail(aptSeq);
      setAptDetail(response.data);
      console.log(response.data);
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="border-r w-[650px] min-w-96">
      <SearchAptBox apartName={aptDetail.apartName} />
      <div className="flex m-3 border rounded-md">
        <MapAptArea
          latitude={aptDetail.latitude}
          longitude={aptDetail.longitude}
        />
      </div>
      <AptInfo />
      <HistoryGraph />
      <HistoryList />
    </div>
  );
};

export default DetailPopup;
