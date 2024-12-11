import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { formatToEokCheon } from "../../utils/methods";

const SliderCost = ({
  selected,
  rangeValuesApt,
  setRangeValuesApt,
  rangeValuesYearly,
  setRangeValuesYearly,
  rangeValuesMonthyD,
  setRangeValuesMonthlyD,
  rangeValuesMonthly,
  setRangeValuesMonthly,
}) => {
  const handleRangeChangeApt = (values) => {
    const adjustedValues = values.map((value) => {
      if (value <= 100000) {
        return Math.round(value / 1000) * 1000;
      } else {
        return Math.round(value / 10000) * 10000;
      }
    });
    setRangeValuesApt(adjustedValues); // 보정된 값을 상태로 업데이트
  };

  const handleRangeChangeYearly = (values) => {
    const adjustedValues = values.map((value) => {
      if (value < 1000) {
        return Math.round(value / 100) * 100;
      } else if (value <= 100000) {
        return Math.round(value / 1000) * 1000;
      } else {
        return Math.round(value / 10000) * 10000;
      }
    });
    setRangeValuesYearly(adjustedValues); // 보정된 값을 상태로 업데이트
  };

  const handleRangeChangeMonthlyD = (values) => {
    const adjustedValues = values.map((value) => {
      if (value < 100) {
        return Math.round(value / 10) * 10;
      } else if (value <= 1000) {
        return Math.round(value / 100) * 100;
      } else {
        return Math.round(value / 1000) * 1000;
      }
    });
    setRangeValuesMonthlyD(adjustedValues); // 보정된 값을 상태로 업데이트
  };

  const handleRangeChangeMonthly = (values) => {
    const adjustedValues = values.map((value) => {
      if (value < 100) {
        return Math.round(value / 10) * 10;
      } else if (value <= 1000) {
        return Math.round(value / 100) * 100;
      } else {
        return Math.round(value / 1000) * 1000;
      }
    });
    setRangeValuesMonthly(adjustedValues); // 보정된 값을 상태로 업데이트
  };

  return (
    <div className="w-full my-10 text-center">
      {selected === 0 && (
        <div>
          <div className="flex text-lg font-medium text-gray-600 mb-3">매매 가격</div>
          <Slider
            range // 범위 슬라이더를 활성화
            min={1000}
            max={500000}
            step={1} // 작은 단위로 설정 후 보정
            defaultValue={rangeValuesApt}
            onChange={handleRangeChangeApt} // 실시간 값 업데이트 및 보정
            allowCross={false} // 핸들이 교차하지 않도록 설정
            trackStyle={[{ backgroundColor: "#E3C04D", height: 8 }]} // 선택된 범위 색상
            handleStyle={[
              { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
              { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
            ]} // 핸들 스타일
            railStyle={{ backgroundColor: "#ddd", height: 8 }} // 선택되지 않은 부분
          />
          <div className="mt-2 mb-5">
            <p>
              <strong>{formatToEokCheon(rangeValuesApt[0])}</strong> -{" "}
              {rangeValuesApt[1] === 500000 ? (
                <strong>{formatToEokCheon(rangeValuesApt[1])} 이상</strong>
              ) : (
                <strong>{formatToEokCheon(rangeValuesApt[1])}</strong>
              )}
            </p>
          </div>
        </div>
      )}
      {selected === 1 && (
        <div>
          <div className="flex text-lg font-medium text-gray-600 mb-3">전세 가격</div>
          <Slider
            range // 범위 슬라이더를 활성화
            min={1000}
            max={100000}
            step={1} // 작은 단위로 설정 후 보정
            defaultValue={rangeValuesYearly}
            onChange={handleRangeChangeYearly} // 실시간 값 업데이트 및 보정
            allowCross={false} // 핸들이 교차하지 않도록 설정
            trackStyle={[{ backgroundColor: "#E3C04D", height: 8 }]} // 선택된 범위 색상
            handleStyle={[
              { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
              { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
            ]} // 핸들 스타일
            railStyle={{ backgroundColor: "#ddd", height: 8 }} // 선택되지 않은 부분
          />
          <div className="mt-2 mb-5">
            <p>
              가격: <strong>{formatToEokCheon(rangeValuesYearly[0])}</strong> -{" "}
              {rangeValuesYearly[1] === 100000 ? (
                <strong>{formatToEokCheon(rangeValuesYearly[1])} 이상</strong>
              ) : (
                <strong>{formatToEokCheon(rangeValuesYearly[1])}</strong>
              )}
            </p>
          </div>
        </div>
      )}
      {selected === 2 && (
        <>
          <div>
            <div className="flex text-lg font-medium text-gray-600 mb-3">보증금 가격</div>
            <Slider
              range // 범위 슬라이더를 활성화
              min={10}
              max={10000}
              step={1} // 작은 단위로 설정 후 보정
              defaultValue={rangeValuesMonthyD}
              onChange={handleRangeChangeMonthlyD} // 실시간 값 업데이트 및 보정
              allowCross={false} // 핸들이 교차하지 않도록 설정
              trackStyle={[{ backgroundColor: "#E3C04D", height: 8 }]} // 선택된 범위 색상
              handleStyle={[
                { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
                { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
              ]} // 핸들 스타일
              railStyle={{ backgroundColor: "#ddd", height: 8 }} // 선택되지 않은 부분
            />
            <div className="mt-2 mb-5">
              <p>
                <strong>{formatToEokCheon(rangeValuesMonthyD[0])}</strong> -{" "}
                {rangeValuesMonthyD[1] === 10000 ? (
                  <strong>{formatToEokCheon(rangeValuesMonthyD[1])} 이상</strong>
                ) : (
                  <strong>{formatToEokCheon(rangeValuesMonthyD[1])}</strong>
                )}
              </p>
            </div>
          </div>
          <div>
            <div className="flex text-lg font-medium text-gray-600 mb-3">월세 가격</div>
            <Slider
              range // 범위 슬라이더를 활성화
              min={10}
              max={10000}
              step={1} // 작은 단위로 설정 후 보정
              defaultValue={rangeValuesMonthly}
              onChange={handleRangeChangeMonthly} // 실시간 값 업데이트 및 보정
              allowCross={false} // 핸들이 교차하지 않도록 설정
              trackStyle={[{ backgroundColor: "#E3C04D", height: 8 }]} // 선택된 범위 색상
              handleStyle={[
                { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
                { borderColor: "#E3C04D", height: 20, width: 20, marginTop: -7 },
              ]} // 핸들 스타일
              railStyle={{ backgroundColor: "#ddd", height: 8 }} // 선택되지 않은 부분
            />
            <div className="mt-2 mb-5">
              <p>
                <strong>{formatToEokCheon(rangeValuesMonthly[0])}</strong> -{" "}
                {rangeValuesMonthly[1] === 10000 ? (
                  <strong>{formatToEokCheon(rangeValuesMonthly[1])} 이상</strong>
                ) : (
                  <strong>{formatToEokCheon(rangeValuesMonthly[1])}</strong>
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SliderCost;
