import { atom } from "recoil";

// 엑세스 토큰
export const accessTokenState = atom({
  key: "accessTokenState",
  default: localStorage.getItem("accessToken") || null,
});

export const userState = atom({
  key: "userState",
  default: {
    createdAt: "",
    deletedAt: null,
    username: null,
    gender: "",
    isBlocked: "",
    memberId: null,
    nickname: "",
    role: "",
    profile: null,
  },
});

// 반응형 메뉴 오픈 여부
export const menuOpenState = atom({
  key: "menuOpenState",
  default: false,
});

// 로그인 팝업 오픈 여부
export const loginPopupOpenState = atom({
  key: "loginPopupOpenState",
  default: false,
});

// 유저 회원가입 팝업 오픈 여부
export const userSignupPopupOpenState = atom({
  key: "userSignupPopupOpenState",
  default: false,
});

// 중개인 회원가입 팝업 오픈 여부
export const agentSignupPopupOpenState = atom({
  key: "agentSignupPopupOpenState",
  default: false,
});

// 챗봇 팝업 오픈 여부
export const chatbotOpenState = atom({
  key: "chatbotOpenState",
  default: false,
});

// 검색한 동코드 정보
export const dongcodeState = atom({
  key: "dongcodeState",
  default: null,
});

// 동코드 검색 후 로딩 여부
export const loadingState = atom({
  key: "loadingState",
  default: null,
});

export const aptList = atom({
  key: "aptList",
  default: null,
});

// 동코드 검색 여부
export const areaSearched = atom({
  key: "areaSearched",
  default: false,
});

export const areaSearchedDetail = atom({
  key: "areaSearchedDetail",
  default: true,
});

export const paginatedCharterList = atom({
  key: "paginatedCharterList",
  default: [],
});

export const isKakaoLogin = atom({
  key: "isKakaoLogin",
  default: false,
});
