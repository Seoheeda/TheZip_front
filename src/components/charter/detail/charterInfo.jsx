import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  likeCharter,
  unLikeCharter,
  getCharterDetail,
} from "../../../api/charters";
import { MdOutlinePlace } from "react-icons/md";
import { LuBuilding } from "react-icons/lu";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { CharterImgModal } from "../../imgModal";
import { formatToPeung } from "../../../utils/methods";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CharterInfo = () => {
  const { charterId } = useParams();
  const [charterDetail, setCharterDetail] = useState(null); // 초기값 null
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [likeLoading, setLikeLoading] = useState(false); // 좋아요 로딩 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태 추가

  const getDetail = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await getCharterDetail(charterId);
      setCharterDetail(response.data[0]);
    } catch (error) {
      alert("매물 정보를 불러올 수 없습니다.");
      console.error("Error fetching charter details:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    getDetail();
  }, [charterId]);

  const likeHome = async () => {
    if (likeLoading) return; // 중복 호출 방지
    try {
      setLikeLoading(true);
      await likeCharter(charterId);
      setCharterDetail((prev) => ({
        ...prev,
        isInterested: true,
        likes: prev.likes + 1,
      })); // 로컬 상태 업데이트
    } catch (error) {
      alert("좋아요에 실패했습니다.");
      console.error(error);
    } finally {
      setLikeLoading(false);
    }
  };

  const unLikeHome = async () => {
    if (likeLoading) return; // 중복 호출 방지
    try {
      setLikeLoading(true);
      await unLikeCharter(charterId);
      setCharterDetail((prev) => ({
        ...prev,
        isInterested: false,
        likes: prev.likes - 1,
      })); // 로컬 상태 업데이트
    } catch (error) {
      alert("좋아요 취소에 실패했습니다.");
      console.error(error);
    } finally {
      setLikeLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="px-5 py-5 flex flex-row justify-between">
        <div className="space-y-1 w-full">
          <Skeleton height={30} width="80%" />
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} width="50%" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-5 flex flex-row justify-between">
      <div className="space-y-1 w-full">
        <div className="flex justify-between w-full">
          <div className="flex space-x-2 items-center">
            <div>
              서울특별시 {charterDetail.charterGu} {charterDetail.charterDong}{" "}
              {charterDetail.bonbun}-{charterDetail.bubun}
            </div>
            <div className="cursor-pointer">
              {charterDetail.isInterested ? (
                <div className="flex items-center space-x-1">
                  <IoHeartSharp
                    className={`text-xl ${likeLoading ? "text-gray-400" : "text-primary-1"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!likeLoading) unLikeHome();
                    }}
                  />
                  <div className="text-xs">{charterDetail.likes}</div>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <IoHeartOutline
                    className={`text-xl ${likeLoading ? "text-gray-400" : "text-gray-700"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!likeLoading) likeHome();
                    }}
                  />
                  <div className="text-xs">{charterDetail.likes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <MdOutlinePlace className="mr-1 text-primary-1" />
          <div className="text-sm">{charterDetail.buildingUse}</div>
        </div>
        <div className="flex items-center text-sm">
          <LuBuilding className="mr-1 text-primary-1" />
          {charterDetail.size}m<sup>2</sup>&nbsp;&nbsp;
          {Math.round(formatToPeung(charterDetail.size))}평&nbsp;&nbsp;
          {charterDetail.floor}층
        </div>
      </div>
      <CharterImgModal
        isOpen={showModal}
        onClose={closeModal}
        content={charterDetail.image || null} // 안전한 접근
      />
    </div>
  );
};

export default CharterInfo;
