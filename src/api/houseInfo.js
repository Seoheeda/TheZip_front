import { httpClient } from "./http";

export const getAreaList = async (sido, gugun, dong) => {
  try {
    const data = await httpClient.get(`/dongcodes?sido=${sido}&gugun=${gugun}&dong=${dong}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const getAreaName = async (dongCode) => {
  try {
    const data = await httpClient.get(`/dongcodes/${dongCode}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const searchByDongcode = async (dongcode) => {
  try {
    const data = await httpClient.get(`/houseinfos?dongcode=${dongcode}`);
    console.log("검색한 동코드", dongcode);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const searchByCost = async (dongcode, min, max) => {
  try {
    const data = await httpClient.get(`/houseinfos?dongcode=${dongcode}&min=${min}&max=${max}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const searchLocByDongcode = async (dongcode) => {
  try {
    const data = await httpClient.get(`/houseinfos/location?dongcode=${dongcode}`);
    console.log("검색한 동코드", dongcode);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const searchLocByCost = async (dongcode, min, max) => {
  try {
    const data = await httpClient.get(
      `/houseinfos/location?dongcode=${dongcode}&min=${min}&max=${max}`
    );
    console.log("검색한 동코드", dongcode);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const searchByName = async (name) => {
  try {
    console.log("검색한 이름", name);
    const data = await httpClient.get(`/houseinfos/name/${name}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const getAptDetail = async (aptSeq) => {
  try {
    const data = await httpClient.get(`/houseinfos/details/${aptSeq}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const fetchLikeHouse = async () => {
  try {
    const data = await httpClient.get("/interest-house", {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const likeHouse = async (aptSeq) => {
  try {
    const data = await httpClient.post(
      "/interest-house",
      { aptSeq }, // 요청 본문
      {
        headers: { "Content-Type": "application/json" }, // JSON으로 Content-Type 설정
      }
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const unLikeHouse = async (aptSeq) => {
  try {
    const data = await httpClient.delete(`/interest-house/${aptSeq}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const fetchTopNApt = async (count) => {
  try {
    const data = await httpClient.get(`/houseinfos/likes/${count}`, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const fetchImg = async (imageUrl, imageType) => {
  try {
    const data = await httpClient.get(`/images?imageUrl=${imageUrl}&imageType=${imageType}`, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};
