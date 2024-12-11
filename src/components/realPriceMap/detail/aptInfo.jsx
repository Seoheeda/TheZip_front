import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAreaName, getAptDetail, likeHouse, unLikeHouse } from "../../../api/houseInfo";
import { MdOutlinePlace } from "react-icons/md";
import { LuBuilding } from "react-icons/lu";
import { SlPicture } from "react-icons/sl";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { AptImgModal } from "../../imgModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AptInfo = () => {
  const { aptSeq } = useParams();
  const [aptDetail, setAptDetail] = useState(null); // 초기값 null로 설정
  const [searchedSido, setSearchedSido] = useState("");
  const [searchedGugun, setSearchedGugun] = useState("");
  const [searchedDong, setSearchedDong] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [likeLoading, setLikeLoading] = useState(false); // 좋아요 로딩 상태 추가

  const getDetail = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await getAptDetail(aptSeq);
      setAptDetail(response.data);
      getArea(`${response.data.preDongCode}${response.data.postDongCode}`);
    } catch (error) {
      alert("아파트 정보를 불러올 수 없습니다.");
      console.error("Error fetching apartment details:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const getArea = async (dongCode) => {
    try {
      const response = await getAreaName(dongCode);
      setSearchedSido(response.data.sido);
      setSearchedGugun(response.data.gugun);
      setSearchedDong(response.data.dong);
    } catch (error) {
      alert("지역 정보를 불러올 수 없습니다.");
      console.error("Error fetching area details:", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [aptSeq]);

  const updateLikeState = (isLiked) => {
    setAptDetail((prevDetail) => ({
      ...prevDetail,
      isInterested: isLiked,
      likes: prevDetail.likes + (isLiked ? 1 : -1),
    }));
  };

  const likeApt = async (aptSeq) => {
    if (likeLoading) return; // 중복 호출 방지
    try {
      setLikeLoading(true);
      await likeHouse(aptSeq);
      updateLikeState(true); // 로컬 상태 업데이트
    } catch (error) {
      alert("좋아요에 실패했습니다.");
      console.log(error);
    } finally {
      setLikeLoading(false);
    }
  };

  const unLikeApt = async (aptSeq) => {
    if (likeLoading) return; // 중복 호출 방지
    try {
      setLikeLoading(true);
      await unLikeHouse(aptSeq);
      updateLikeState(false); // 로컬 상태 업데이트
    } catch (error) {
      alert("좋아요 취소에 실패했습니다.");
      console.log(error);
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
              {searchedSido} {searchedGugun} {aptDetail.dongName} {aptDetail.jibun}
            </div>
            <div className="cursor-pointer">
              {aptDetail.isInterested ? (
                <div className="flex items-center space-x-1">
                  <IoHeartSharp
                    className={`text-xl ${likeLoading ? "text-gray-400" : "text-primary-1"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      unLikeApt(aptDetail.aptSeq);
                    }}
                  />
                  <div className="text-xs">{aptDetail.likes}</div>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <IoHeartOutline
                    className={`text-xl ${likeLoading ? "text-gray-400" : "text-gray-700"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      likeApt(aptDetail.aptSeq);
                    }}
                  />
                  <div className="text-xs">{aptDetail.likes}</div>
                </div>
              )}
            </div>
          </div>
          <SlPicture className="text-2xl text-gray-1 cursor-pointer" onClick={openModal} />
        </div>
        <div className="flex items-center">
          <MdOutlinePlace className="mr-1 text-primary-1" />
          <div className="text-sm">
            {searchedSido} {searchedDong} {aptDetail.roadName} {aptDetail.roadNameBonbun}{" "}
            {aptDetail.roadNameBubun !== "0" && aptDetail.roadNameBubun}
          </div>
        </div>
        <div className="flex items-center text-sm">
          <LuBuilding className="mr-1 text-primary-1" />
          {aptDetail.apartName} ({aptDetail.buildYear})
        </div>
      </div>
      <AptImgModal isOpen={showModal} onClose={closeModal} content={aptDetail.imageURLs} />
    </div>
  );
};

export default AptInfo;
