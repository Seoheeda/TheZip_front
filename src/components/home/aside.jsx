import React, { useState } from "react";
import AreaDropdown from "../../components/home/areaDropdown";
import Toggle from "../../components/home/toggle";
import SliderCost from "../../components/home/slider";
import ShortCuts from "../../components/home/shortCuts";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const navigate = useNavigate();

  // 지역
  const [dongCode, setDongCode] = useState("");
  // 0: 매물, 1: 전세, 2: 월세
  const [selected, setSelected] = useState(0);
  // 가격
  const [rangeValuesApt, setRangeValuesApt] = useState([1000, 500000]);
  const [rangeValuesYearly, setRangeValuesYearly] = useState([100, 300000]);
  const [rangeValuesMonthyD, setRangeValuesMonthlyD] = useState([10, 10000]);
  const [rangeValuesMonthly, setRangeValuesMonthly] = useState([10, 10000]);

  const onClickSearch = () => {
    if (dongCode === "") {
      alert("지역을 선택하세요.");
      return;
    }

    if (selected === 0) {
      navigate(
        `/realprice_map/dong/${dongCode}/${rangeValuesApt[0]}/${rangeValuesApt[1]}`,
      );
    } else if (selected === 1) {
      navigate(
        `/charters/dong/${dongCode}/${rangeValuesYearly[0]}/${rangeValuesYearly[1]}`,
      );
    } else if (selected === 2) {
      navigate(
        `/charters/dong/${dongCode}/${rangeValuesMonthyD[0]}/${rangeValuesMonthyD[1]}/${rangeValuesMonthly[0]}/${rangeValuesMonthly[1]}`,
      );
    }
  };

  return (
    <div className="h-full lg:w-1/4 bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-xl font-bold text-gray-800">빠른 매물 찾기</h2>
      <AreaDropdown dongCode={dongCode} setDongCode={setDongCode} />
      <Toggle
        options={["매물", "전세", "월세"]}
        value={selected}
        onChange={setSelected}
      />
      <SliderCost
        selected={selected}
        rangeValuesApt={rangeValuesApt}
        setRangeValuesApt={setRangeValuesApt}
        rangeValuesYearly={rangeValuesYearly}
        setRangeValuesYearly={setRangeValuesYearly}
        rangeValuesMonthyD={rangeValuesMonthyD}
        setRangeValuesMonthlyD={setRangeValuesMonthlyD}
        rangeValuesMonthly={rangeValuesMonthly}
        setRangeValuesMonthly={setRangeValuesMonthly}
      />
      <button
        className="mt-6 w-full bg-primary py-2 text-white rounded-md hover:bg-primary-2 transition-all"
        onClick={onClickSearch}
      >
        매물 바로 찾기
      </button>
      <ShortCuts />
    </div>
  );
};

export default Aside;
