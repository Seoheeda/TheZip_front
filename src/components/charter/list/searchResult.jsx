import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { paginatedCharterList } from "../../../recoil/atoms";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import {
  searchByDongcode,
  countCharters,
  likeCharter,
  unLikeCharter,
  searchByCostYearly,
  searchByCostMonthly,
  searchByDongcodeYearlyMonthly,
  countChartersByDongcodeYearlyMonthly,
  countChartersByCostYearly,
  countChartersByCostMonthly,
} from "../../../api/charters";
import Pagination from "./pagination";
import { formatToEokCheon, formatToPeung, formatFloor } from "../../../utils/methods";
import { CharterImageLoader } from "../../../utils/imageLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchResult = () => {
  const [charterList, setCharterList] = useRecoilState(paginatedCharterList);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCnt, setTotalCnt] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const navigate = useNavigate();
  const { dongCode } = useParams();
  const { charterKind } = useParams();
  const { depositMin } = useParams();
  const { depositMax } = useParams();
  const { rentMin } = useParams();
  const { rentMax } = useParams();
  const { collegeName } = useParams();
  const itemsPerPage = 20;
  const pagesPerGroup = 5;

  const titleRef = useRef(null);
  const location = useLocation(); // 현재 경로 확인

  const searchApt = async (dongcode, page) => {
    try {
      setLoading(true); // 로딩 시작
      const start = (page - 1) * itemsPerPage;
      const response = await searchByDongcode(dongcode, start, itemsPerPage);
      setCharterList(response.data);
      console.log(response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const searchAptYearlyMonthly = async (dongcode, page, charterKind) => {
    try {
      setLoading(true); // 로딩 시작
      const start = (page - 1) * itemsPerPage;
      const response = await searchByDongcodeYearlyMonthly(
        dongcode,
        start,
        itemsPerPage,
        charterKind
      );
      setCharterList(response.data);
      console.log(response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const searchAptYearlyByCost = async (dongcode, page, min, max) => {
    try {
      setLoading(true); // 로딩 시작
      const start = (page - 1) * itemsPerPage;
      const response = await searchByCostYearly(dongcode, start, itemsPerPage, min, max);
      setCharterList(response.data);
      console.log(response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const searchAptMonthlyByCost = async (dongcode, page, min, max, minR, maxR) => {
    try {
      setLoading(true); // 로딩 시작
      const start = (page - 1) * itemsPerPage;
      const response = await searchByCostMonthly(
        dongcode,
        start,
        itemsPerPage,
        min,
        max,
        minR,
        maxR
      );
      setCharterList(response.data);
      console.log(response.data);
    } catch (error) {
      alert("검색에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const getCount = async (dongcode) => {
    try {
      setLoading(true); // 로딩 시작
      const response = await countCharters(dongcode);
      setTotalPages(Math.ceil(response.data / itemsPerPage));
      setTotalCnt(response.data);
      console.log(response.data);
    } catch (error) {
      alert("데이터 총 개수 조회에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const getCountByDongcodeYearlyMonthly = async (dongcode, charterKind) => {
    try {
      setLoading(true); // 로딩 시작
      const response = await countChartersByDongcodeYearlyMonthly(dongcode, charterKind);
      setTotalPages(Math.ceil(response.data / itemsPerPage));
      setTotalCnt(response.data);
    } catch (error) {
      alert("데이터 개수 조회에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const getCountByCostYearly = async (dongcode, min, max) => {
    try {
      setLoading(true); // 로딩 시작
      const response = await countChartersByCostYearly(dongcode, min, max);
      setTotalPages(Math.ceil(response.data / itemsPerPage));
      setTotalCnt(response.data);
    } catch (error) {
      alert("데이터 개수 조회에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const getCountByCostMonthly = async (dongcode, min, max, minR, maxR) => {
    try {
      setLoading(true); // 로딩 시작
      const response = await countChartersByCostMonthly(dongcode, min, max, minR, maxR);
      setTotalPages(Math.ceil(response.data / itemsPerPage));
    } catch (error) {
      alert("데이터 개수 조회에 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if (charterKind) {
      searchAptYearlyMonthly(dongCode, currentPage, charterKind);
      getCountByDongcodeYearlyMonthly(dongCode, charterKind);
    } else if (!depositMin) {
      searchApt(dongCode, currentPage);
      getCount(dongCode);
      console.log("학교 검색하면 이거");
    } else if (!rentMin) {
      searchAptYearlyByCost(dongCode, currentPage, depositMin, depositMax);
      getCountByCostYearly(dongCode, depositMin, depositMax);
    } else if (!charterKind) {
      searchAptMonthlyByCost(dongCode, currentPage, depositMin, depositMax, rentMin, rentMax);
      getCountByCostMonthly(dongCode, depositMin, depositMax, rentMin, rentMax);
    }
  }, [dongCode, currentPage, charterKind]);

  const scrollToTitle = () => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const getDetail = (charterId) => {
    if (location.pathname.startsWith("/charters/college")) {
      navigate(`/charters/college/detail/${charterId}`);
    } else {
      navigate(`/charters/detail/${charterId}`);
    }
  };

  const likeHome = async (charterId) => {
    try {
      const response = await likeCharter(charterId);
      searchApt(dongCode, currentPage);
    } catch (error) {
      alert("좋아요에 실패했습니다.");
      console.log(error);
    } finally {
    }
  };

  const unLikeHome = async (charterId) => {
    try {
      const response = await unLikeCharter(charterId);
      searchApt(dongCode, currentPage);
    } catch (error) {
      alert("좋아요 취소에 실패했습니다.");
      console.log(error);
    } finally {
    }
  };

  const startPage = useMemo(() => (currentGroup - 1) * pagesPerGroup + 1, [currentGroup]);

  const endPage = useMemo(
    () => Math.min(currentGroup * pagesPerGroup, totalPages),
    [currentGroup, totalPages]
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTitle();
  };

  const handleGroupChange = (direction) => {
    if (direction === "next") {
      setCurrentGroup((prevGroup) => {
        const nextGroup = prevGroup + 1;
        if (nextGroup <= Math.ceil(totalPages / pagesPerGroup)) {
          setCurrentPage((nextGroup - 1) * pagesPerGroup + 1);
        }
        scrollToTitle();
        return nextGroup;
      });
    } else if (direction === "prev") {
      setCurrentGroup((prevGroup) => {
        const prevGroupValue = prevGroup - 1;
        if (prevGroupValue >= 1) {
          setCurrentPage((prevGroupValue - 1) * pagesPerGroup + 1);
        }
        scrollToTitle();
        return prevGroupValue;
      });
    }
  };

  const goToStart = () => {
    setCurrentGroup(1);
    setCurrentPage(1);
    scrollToTitle();
  };

  const goToEnd = () => {
    const lastGroup = Math.ceil(totalPages / pagesPerGroup);
    const lastPage = totalPages;
    setCurrentGroup(lastGroup);
    setCurrentPage(lastPage);
    scrollToTitle();
  };

  const renderSkeletons = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <div
        key={`skeleton- ${index}`}
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
    <div className="w-full max-h-[800px] scrollbar-hide overflow-auto">
      <div
        className="flex items-center space-x-5 pl-8 pr-3 xl:pr-8 py-4 justify-between"
        ref={titleRef}
      >
        <div className="flex px-3 h-10 rounded-3xl items-center justify-center bg-gray-1 text-white text-sm xl:text-md">
          {totalCnt}개 검색 결과
        </div>
        {!depositMin && (
          <div className="flex space-x-3 xl:space-x-5 text-sm xl:text-md">
            <div
              className={`cursor-pointer ${
                charterKind !== "전세" && charterKind !== "월세" ? "text-primary-1" : ""
              }`}
              onClick={() => {
                if (!location.pathname.startsWith("/charters/college")) {
                  navigate(`/charters/dong/${dongCode}`);
                } else {
                  navigate(`/charters/college/${collegeName}/${dongCode}`);
                }
              }}
            >
              모두 보기
            </div>
            <div
              className={`cursor-pointer ${charterKind === "전세" ? "text-primary-1" : ""}`}
              onClick={() => {
                if (!location.pathname.startsWith("/charters/college")) {
                  navigate(`/charters/dong/${dongCode}/전세`);
                } else {
                  navigate(`/charters/college/${collegeName}/${dongCode}/전세`);
                }
              }}
            >
              전세만 보기
            </div>
            <div
              className={`cursor-pointer ${charterKind === "월세" ? "text-primary-1" : ""}`}
              onClick={() => {
                if (!location.pathname.startsWith("/charters/college")) {
                  navigate(`/charters/dong/${dongCode}/월세`);
                } else {
                  navigate(`/charters/college/${collegeName}/${dongCode}/월세`);
                }
              }}
            >
              월세만 보기
            </div>
          </div>
        )}
      </div>
      {charterList.length === 0 && !loading && <div>매물이 없습니다</div>}

      {loading
        ? renderSkeletons()
        : charterList.map((charterItem, index) => (
            <div
              key={index}
              className="relative flex flex-row border-b px-2 py-4 space-x-5 hover:bg-primary-5 cursor-pointer"
              onClick={() => getDetail(charterItem.charterId)}
            >
              <div className="absolute right-5 top-6 cursor-pointer">
                {charterItem.isInterested === true ? (
                  <div className="flex flex-col items-center">
                    <IoHeartSharp
                      className="text-xl text-primary-1"
                      onClick={(e) => {
                        e.stopPropagation(); // 이벤트 전파 중단
                        unLikeHome(charterItem.charterId);
                      }}
                    />
                    <div className="text-xs">{charterItem.likes}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <IoHeartOutline
                      className="text-xl text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation(); // 이벤트 전파 중단
                        likeHome(charterItem.charterId);
                      }}
                    />
                    <div className="text-xs">{charterItem.likes}</div>
                  </div>
                )}
              </div>
              <div>
                <div className="w-32 h-36">
                  <CharterImageLoader
                    imageURLs={charterItem.image} // 이미지 URL 또는 기본 이미지
                    alt={charterItem.title}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1 justify-center">
                <div className="flex text-lg font-semibold">
                  {charterItem.charterKind}&nbsp;
                  {charterItem.charterKind === "월세" ? (
                    <div>
                      {charterItem.rent} / {charterItem.deposit}
                    </div>
                  ) : (
                    <div>{formatToEokCheon(charterItem.deposit)}</div>
                  )}
                </div>
                <div className="text-sm">
                  {charterItem.charterDong} {charterItem.bonbun}-{charterItem.bubun}
                </div>
                <div className="flex space-x-3 text-sm">
                  <div>{formatFloor(charterItem.floor)}</div>
                  <div>
                    {charterItem.size} m<sup>2</sup>
                  </div>
                  <div>{Math.round(formatToPeung(charterItem.size))}평</div>
                </div>
                <div className="flex text-sm">
                  <div>건축년도: &nbsp;</div>
                  <div>{charterItem.constructionYear}년</div>
                </div>
              </div>
            </div>
          ))}

      {/* 페이지네이션 버튼 */}
      {charterList && charterList.length > 0 && (
        <Pagination
          startPage={startPage}
          endPage={endPage}
          currentPage={currentPage}
          totalPages={totalPages}
          currentGroup={currentGroup}
          handlePageChange={handlePageChange}
          handleGroupChange={handleGroupChange}
          goToStart={goToStart}
          goToEnd={goToEnd}
          pagesPerGroup={pagesPerGroup}
        />
      )}
    </div>
  );
};

export default SearchResult;
