import axios from "axios";

export const createClient = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URI,
    timeout: process.env.REACT_APP_DEFAULT_TIMEOUT,
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      // 토큰이 있을 경우 헤더에 명시
      if (accessToken) {
        config.headers.access = `${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
};

export const httpClient = createClient();
