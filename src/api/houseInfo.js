import { httpClient } from "./http";

export const getAreaList = async (sido, gugun, dong) => {
  try {
    const data = await httpClient.get(
      `/dongcodes?sido=${sido}&gugun=${gugun}&dong=${dong}`,
    );
    return data;
  } catch (error) {
    console.error("getAreaList 에러 발생:", error);
    throw error;
  }
};

export const getAreaName = async (dongCode) => {
  try {
    const data = await httpClient.get(`/dongcodes/${dongCode}`);
    return data;
  } catch (error) {
    console.error("getAreaName 에러 발생:", error);
    throw error;
  }
};

export const searchByDongcode = async (dongcode) => {
  try {
    const data = await httpClient.get(`/houseinfos?dongcode=${dongcode}`);
    return data;
  } catch (error) {
    console.error("searchByDongcode 에러 발생:", error);
    throw error;
  }
};

export const searchByCost = async (dongcode, min, max) => {
  try {
    const data = await httpClient.get(
      `/houseinfos?dongcode=${dongcode}&min=${min}&max=${max}`,
    );
    return data;
  } catch (error) {
    console.error("searchByCost 에러 발생:", error);
    throw error;
  }
};

export const searchLocByDongcode = async (dongcode) => {
  try {
    const data = await httpClient.get(
      `/houseinfos/location?dongcode=${dongcode}`,
    );
    return data;
  } catch (error) {
    console.error("searchLocByDongcode 에러 발생:", error);
    throw error;
  }
};

export const searchLocByCost = async (dongcode, min, max) => {
  try {
    const data = await httpClient.get(
      `/houseinfos/location?dongcode=${dongcode}&min=${min}&max=${max}`,
    );
    return data;
  } catch (error) {
    console.error("searchLocByCost 에러 발생:", error);
    throw error;
  }
};

export const searchByName = async (name) => {
  try {
    const data = await httpClient.get(`/houseinfos/name/${name}`);
    return data;
  } catch (error) {
    console.error("searchByName 에러 발생:", error);
    throw error;
  }
};

export const getAptDetail = async (aptSeq) => {
  try {
    const data = await httpClient.get(`/houseinfos/details/${aptSeq}`);
    return data;
  } catch (error) {
    console.error("getAptDetail 에러 발생:", error);
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
    console.error("fetchLikeHouse 에러 발생:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const likeHouse = async (aptSeq) => {
  try {
    const data = await httpClient.post("/interest-house", { aptSeq });
    return data;
  } catch (error) {
    console.error("likeHouse 에러 발생:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const unLikeHouse = async (aptSeq) => {
  try {
    const data = await httpClient.delete(`/interest-house/${aptSeq}`);
    return data;
  } catch (error) {
    console.error("unLikeHouse 에러 발생:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const fetchTopNApt = async (count) => {
  try {
    const data = await httpClient.get(`/houseinfos/likes/${count}`);
    return data;
  } catch (error) {
    console.error("fetchTopNApt 에러 발생:", error);
    throw error;
  }
};

export const fetchImg = async (imageUrl, imageType) => {
  try {
    const data = await httpClient.get(
      `/images?imageUrl=${imageUrl}&imageType=${imageType}`,
    );
    return data;
  } catch (error) {
    console.error("fetchImg 에러 발생:", error);
    throw error;
  }
};
