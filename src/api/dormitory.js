import { httpClient } from "./http";

export const fetchCollegeInfo = async (name) => {
  try {
    const data = await httpClient.get(`/colleges/name/${encodeURIComponent(name)}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const fetchDormList = async (collegeId) => {
  try {
    const data = await httpClient.get(`/dormitories/college/${collegeId}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};

export const fetchDormDetail = async (dormId) => {
  try {
    const data = await httpClient.get(`/dormitories/id/${dormId}`);
    return data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
};
