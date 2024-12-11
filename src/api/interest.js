import { httpClient } from "./http";

export const getInterestArea = async () => {
  try {
    const data = await httpClient.get("/interest-area");
    return data;
  } catch (error) {
    console.error("관심 지역 불러오기 실패:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const addInterestArea = async (dongcode) => {
  try {
    const data = await httpClient.post(
      "/interest-area",
      { dongCode: dongcode }, // 요청 본문
      {
        headers: { "Content-Type": "application/json" }, // JSON으로 Content-Type 설정
      }
    );
    return data;
  } catch (error) {
    console.error("관심 지역 추가 실패:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const deleteInterestArea = async (interestAreaId) => {
  try {
    const data = await httpClient.delete(`/interest-area/${interestAreaId}`);
    return data;
  } catch (error) {
    console.error("관심 지역 삭제 실패:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};
