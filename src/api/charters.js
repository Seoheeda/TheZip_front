import { httpClient } from "./http";

export const searchByDongcode = async (dongcode, start, limit) => {
  try {
    const data = await httpClient.get(
      `/charters?dongCode=${dongcode}&start=${start}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error; // 에러 핸들링을 위해 다시 throw
  }
};

export const searchByDongcodeYearlyMonthly = async (dongcode, start, limit, charterKind) => {
  try {
    console.log(charterKind);
    const data = await httpClient.get(
      `/charters?dongCode=${dongcode}&start=${start}&limit=${limit}&charterKind=${charterKind}`
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error; // 에러 핸들링을 위해 다시 throw
  }
};

export const searchByCostYearly = async (dongcode, start, limit, min, max) => {
  try {
    const data = await httpClient.get(
      `/charters?dongCode=${dongcode}&charterKind=전세&depositMin=${min}&depositMax=${max}&start=${start}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const searchByCostMonthly = async (dongcode, start, limit, min, max, minR, maxR) => {
  try {
    const data = await httpClient.get(
      `/charters?dongCode=${dongcode}&charterKind=월세&depositMin=${min}&depositMax=${max}&rentMin=${minR}&rentMax=${maxR}&start=${start}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const searchByName = async (name) => {
  try {
    const data = await httpClient.get(`/charters/name/${name}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const countCharters = async (dongcode) => {
  try {
    const data = await httpClient.get(`/charters/count?dongCode=${dongcode}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const countChartersByDongcodeYearlyMonthly = async (dongcode, charterKind) => {
  try {
    const data = await httpClient.get(
      `/charters/count?dongCode=${dongcode}&charterKind=${charterKind}`
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error; // 에러 핸들링을 위해 다시 throw
  }
};

export const countChartersByCostYearly = async (dongcode, min, max) => {
  try {
    const data = await httpClient.get(
      `/charters/count?dongCode=${dongcode}&charterKind=전세&depositMin=${min}&depositMax=${max}`
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error; // 에러 핸들링을 위해 다시 throw
  }
};

export const countChartersByCostMonthly = async (dongcode, min, max, minR, maxR) => {
  try {
    const data = await httpClient.get(
      `/charters/count?dongCode=${dongcode}&charterKind=월세&depositMin=${min}&depositMax=${max}&rentMin=${minR}&rentMax=${maxR}`
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error; // 에러 핸들링을 위해 다시 throw
  }
};

export const getCharterDetail = async (charterId) => {
  try {
    const data = await httpClient.get(`/charters/charter-id/${charterId}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const fetchLikeCharter = async (params) => {
  try {
    // params가 존재하면 query string에 추가
    const queryString = params ? params : "";

    const data = await httpClient.get(`/interest-charter?charterKind=${queryString}`, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    alert("로그인 시 이용 가능한 서비스입니다.");
    throw error;
  }
};

export const likeCharter = async (charterId) => {
  try {
    const data = await httpClient.post(
      "/interest-charter",
      { charterId }, // 요청 본문
      { headers: { "Content-Type": "application/json" } } // JSON 요청 설정
    );
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const unLikeCharter = async (charterId) => {
  try {
    const data = await httpClient.delete(`/interest-charter/${charterId}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const fetchTopNCharter = async (charterKind, count) => {
  try {
    const data = await httpClient.get(`/charters/likes?charterKind=${charterKind}&count=${count}`, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};
