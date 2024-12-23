import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apt from "../../../assets/imgs/apt.webp";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import {
  searchByDongcode,
  searchByCost,
  likeHouse,
  unLikeHouse,
} from "../../../api/houseInfo";
import { formatToEokCheon, formatToPeung } from "../../../utils/methods";
import { AptImageLoader } from "../../../utils/imageLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchResult = () => {
  const [aptList, setAptList] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [likeLoading, setLikeLoading] = useState({}); // 각 아이템의 좋아요 로딩 상태
  const navigate = useNavigate();

  const searchApt = async (dongcode) => {
    try {
      setLoading(true);
      const response = await searchByDongcode(dongcode);
      setAptList(response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchAptByCost = async (dongcode, min, max) => {
    try {
      setLoading(true);
      const response = await searchByCost(dongcode, min, max);
      setAptList(response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { dongCode } = useParams();
  const { min } = useParams();
  const { max } = useParams();

  useEffect(() => {
    if (!min && !max) {
      searchApt(dongCode);
    } else {
      searchAptByCost(dongCode, min, max);
    }
  }, [dongCode, min, max]);

  const getDetail = (aptSeq) => {
    navigate(`/realprice_map/detail/${aptSeq}`);
  };

  const updateLikeState = (aptSeq, isLiked) => {
    setAptList((prevList) =>
      prevList.map((item) =>
        item.aptSeq === aptSeq
          ? {
              ...item,
              isInterested: isLiked,
              likes: item.likes + (isLiked ? 1 : -1),
            }
          : item,
      ),
    );
  };

  const likeApt = async (aptSeq) => {
    if (likeLoading[aptSeq]) return; // 중복 호출 방지
    try {
      setLikeLoading((prev) => ({ ...prev, [aptSeq]: true }));
      await likeHouse(aptSeq);
      updateLikeState(aptSeq, true);
    } catch (error) {
      alert("좋아요에 실패했습니다.");
      console.log(error);
    } finally {
      setLikeLoading((prev) => ({ ...prev, [aptSeq]: false }));
    }
  };

  const unLikeApt = async (aptSeq) => {
    if (likeLoading[aptSeq]) return; // 중복 호출 방지
    try {
      setLikeLoading((prev) => ({ ...prev, [aptSeq]: true }));
      await unLikeHouse(aptSeq);
      updateLikeState(aptSeq, false);
    } catch (error) {
      alert("좋아요 취소에 실패했습니다.");
      console.log(error);
    } finally {
      setLikeLoading((prev) => ({ ...prev, [aptSeq]: false }));
    }
  };

  const renderSkeletons = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="relative flex flex-row border-b px-6 py-4 space-x-5"
      >
        <div className="w-52 h-36">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="flex flex-col space-y-1 justify-center w-full">
          <Skeleton width="70%" height={20} />
          <Skeleton width="50%" height={15} />
          <Skeleton width="60%" height={15} />
          <Skeleton width="40%" height={15} />
        </div>
      </div>
    ));

  return (
    <div className="w-full max-h-[800px] custom-scrollbar overflow-auto">
      <div className="flex items-center space-x-5 px-8 py-4">
        <div className="flex px-3 h-10 rounded-3xl items-center justify-center bg-gray-1 text-white">
          {aptList.length}개 검색 결과
        </div>
        {aptList.length === 0 && !loading && <div>매물이 없습니다</div>}
      </div>
      {loading
        ? renderSkeletons()
        : aptList.map((aptItem) => (
            <div
              key={aptItem.aptSeq}
              className="relative flex flex-row border-b px-2 py-4 space-x-5 hover:bg-primary-5 cursor-pointer"
              onClick={() => getDetail(aptItem.aptSeq)}
            >
              <div className="absolute right-5 top-6 cursor-pointer">
                {aptItem.isInterested ? (
                  <IoHeartSharp
                    className={`text-xl ${
                      likeLoading[aptItem.aptSeq]
                        ? "text-gray-400"
                        : "text-primary-1"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 중단
                      unLikeApt(aptItem.aptSeq);
                    }}
                  />
                ) : (
                  <IoHeartOutline
                    className={`text-xl ${
                      likeLoading[aptItem.aptSeq]
                        ? "text-gray-400"
                        : "text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 중단
                      likeApt(aptItem.aptSeq);
                    }}
                  />
                )}
                <div className="text-xs text-center">{aptItem.likes}</div>
              </div>
              <div>
                <div className="w-32 h-36">
                  {aptItem.imageResponseDTO ? (
                    <AptImageLoader
                      imageURLs={aptItem.imageResponseDTO}
                      alt={aptItem.title}
                    />
                  ) : (
                    <img src={apt} alt="아파트 이미지" />
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-1 justify-center">
                <h1 className="text-lg font-semibold">
                  매매&nbsp;
                  {formatToEokCheon(
                    aptItem.houseDealList[aptItem.houseDealList.length - 1]
                      .dealAmount,
                  )}
                </h1>
                <div className="text-sm">{aptItem.apartName} 아파트</div>
                <div className="flex space-x-3 text-sm">
                  <div>
                    {
                      aptItem.houseDealList[aptItem.houseDealList.length - 1]
                        .floor
                    }
                    층
                  </div>
                  <div>
                    {
                      aptItem.houseDealList[aptItem.houseDealList.length - 1]
                        .size
                    }{" "}
                    m<sup>2</sup>
                  </div>
                  <div>
                    {Math.round(
                      formatToPeung(
                        aptItem.houseDealList[aptItem.houseDealList.length - 1]
                          .size,
                      ),
                    )}
                    평
                  </div>
                </div>
                <div className="flex text-sm">
                  <div>건축년도: &nbsp;</div>
                  <div>{aptItem.buildYear}년</div>
                </div>
                <div className="flex text-sm">
                  <div>
                    {aptItem.dongName} {aptItem.jibun}
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SearchResult;
