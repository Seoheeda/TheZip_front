import React, { useState, useEffect } from "react";
import Search from "../../components/realPriceMap/search/search";
import Map from "../../components/home/MapCur";
import { searchByName } from "../../api/houseInfo";

const RealPriceMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const [aptList, setAptList] = useState([]);

  const searchApt = async (name, start = 0, limit = 10) => {
    try {
      const response = await searchByName(name, start, limit);
      setAptList(response.data); // 서버에서 받아온 데이터를 aptList에 저장합니다.
      console.log(response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchApt(searchTerm);
      setSearched(true);
    } else {
      setSearched(false);
    }
  }, [searchTerm]);

  return (
    <div className="w-full h-full flex ">
      <div className="w-full h-full relative">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searched={searched}
          aptList={aptList}
        />
        <Map />
      </div>
    </div>
  );
};

export default RealPriceMap;
