import { httpClient } from "./http";
import basicProfile from "../assets/imgs/basicProfile.jpg";

export const checkEmail = async (username: string): Promise<boolean> => {
  try {
    const response = await httpClient.post(`/members/check-email`, {
      username: username,
    });
    return response.data;
  } catch (error) {
    console.error("이메일 중복확인 실패:", error);
    throw error;
  }
};

export const checkNickname = async (nickname: string): Promise<boolean> => {
  try {
    const response = await httpClient.post(`/members/check-nickname`, {
      nickName: nickname,
    });

    return response.data;
  } catch (error) {
    console.error("닉네임 중복확인 실패:", error);
    throw error;
  }
};

export const SubmitSignup = async (
  username: string,
  password: string,
  nickname: string,
  gender: string,
  role: string,
  profile: File | null,
): Promise<void> => {
  try {
    const formData = new FormData();

    const member = {
      username: username,
      password: password,
      nickname: nickname,
      gender: gender,
      role: role,
      profile: profile,
    };

    formData.append(
      "member",
      new Blob([JSON.stringify(member)], { type: "application/json" }),
    );

    if (profile) {
      formData.append("image", profile);
    } else {
      // 기본 프로필 이미지를 파일 객체로 변환
      const response = await fetch(basicProfile);
      const blob = await response.blob();
      const defaultImageFile = new File([blob], "profile.jpg", {
        type: blob.type,
      });
      formData.append("image", defaultImageFile);
    }

    const data = await httpClient.post(`/members`, formData);
    console.log(data);
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

export const SubmitLogin = async (username: string, password: string) => {
  try {
    const response = await httpClient.post(
      `/login`,
      { username: username, password: password },
      { withCredentials: true },
    );
    const accessToken = response.headers["access"];
    return accessToken;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

export const SubmitLogout = async () => {
  try {
    await httpClient.post(`/logout`, {}, { withCredentials: true });
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("로그아웃 실패 :", error);
    throw error;
  }
};

export const SubmitKakaoLogin = async () => {
  try {
    const response = await httpClient.post(`/oauth2`, {
      withCredentials: true,
    });
    localStorage.setItem("oauth2", "false");
    const accessToken = response.headers["access"];
    return accessToken;
  } catch (error) {
    console.error("카카오 로그인에 실패했습니다:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const data = await httpClient.get(`/members`);
    return data;
  } catch (error) {
    console.error("유저 정보를 불러오는 데 실패했습니다:", error);
    throw error;
  }
};

export const changePassword = async (password: string) => {
  try {
    const formData = new FormData();

    const member = {
      password: password,
      nickname: "",
      gender: "",
      role: "",
    };

    formData.append("member", JSON.stringify(member));

    const data = await httpClient.put(`/members`, formData);

    return data;
  } catch (error) {
    console.error("비밀번호 변경 실패:", error);
    throw error;
  }
};

export const changeUserInfo = async (
  nickname: string,
  gender: string,
  imgFile: string,
) => {
  try {
    const formData = new FormData();

    const member = {
      password: "",
      nickname: nickname,
      gender: gender,
      role: "",
    };

    formData.append("member", JSON.stringify(member));

    if (imgFile) {
      formData.append("image", imgFile);
    }

    const data = await httpClient.put(`/members`, formData);

    return data;
  } catch (error) {
    console.error("회원정보 변경 실패:", error);
    throw error;
  }
};
