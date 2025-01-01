import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharterDetail } from "../../../api/charters";
import SearchAptBox from "./searchCharterBox";
import MapAptArea from "./mapCharterArea";
import CharterInfo from "./charterInfo";
import HistoryList from "./historyList";

const DetailPopup = () => {
  const { charterId } = useParams();
  const [charterDetail, setCharterDetail] = useState(null);

  const getDetail = async () => {
    try {
      const response = await getCharterDetail(charterId);
      setCharterDetail(response.data[0]); // response.data가 배열이라면 [0]만 저장
      // console.log(response.data[0]);
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  // charterDetail이 아직 로드되지 않았을 때 로딩 상태 처리
  if (!charterDetail) {
    return <div></div>;
  }

  return (
    <div className="border-r w-[650px] min-w-96">
      <SearchAptBox
        charterName={charterDetail.name}
        charterDong={charterDetail.charterDong}
      />
      <div className="flex m-3 border rounded-md">
        <MapAptArea
          latitude={charterDetail.latitude}
          longitude={charterDetail.longitude}
        />
      </div>
      <CharterInfo />
      <HistoryList />
    </div>
  );
};

export default DetailPopup;
