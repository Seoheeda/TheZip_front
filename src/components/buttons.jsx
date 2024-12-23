import React from "react";
import GoogleLogo from "../assets/imgs/googleLogo.png";
import KakaoLogo from "../assets/imgs/kakaoLogo.png";

export const GoogleLoginBtn = () => {
  return (
    <button className="h-9 border border-gray-2 rounded-md flex items-center space-x-2 px-4 my-1">
      <img src={GoogleLogo} alt="Google Logo" width="25px" className="fixed" />
      <div className="flex w-full">
        <div className="self-center text-center  w-full text-sm">
          구글로 시작하기
        </div>
      </div>
    </button>
  );
};

export const KakaoLoginBtn = () => {
  const onKakaoLogin = () => {
    localStorage.setItem("oauth2", true);
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <button
      className="bg-kakao-1 h-9 rounded-md flex items-center space-x-2 px-4 my-1"
      onClick={onKakaoLogin}
    >
      <img src={KakaoLogo} alt="Kakao Logo" width="25px" className="fixed" />
      <div className="flex w-full">
        <div className="self-center text-center w-full text-sm">
          카카오로 시작하기
        </div>
      </div>
    </button>
  );
};

export const UserSignupBtn = ({ openUserSignupPopup }) => {
  return (
    <button
      className="border w-[50%] border-primary-3 h-9 rounded-md my-2 hover:border-primary-2 text-sm"
      onClick={openUserSignupPopup}
    >
      개인회원 가입
    </button>
  );
};

export const AgentSignupBtn = ({ openAgentSignupPopup }) => {
  return (
    <button
      className="border w-[50%] border-primary-3 h-9 rounded-md my-2 hover:border-primary-2 text-sm"
      onClick={openAgentSignupPopup}
    >
      중개회원 가입
    </button>
  );
};

export const LoginBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-2 h-9 rounded-md my-2 hover:bg-primary-4 text-sm"
      tabIndex="0"
    >
      로그인
    </button>
  );
};

export const SignupBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-2 h-9 rounded-md my-2 hover:bg-primary-4 text-sm"
    >
      이메일로 시작하기
    </button>
  );
};
