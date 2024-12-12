import React from "react";
import { useSetRecoilState } from "recoil";
import { loginPopupOpenState, accessTokenState } from "../../recoil/atoms";
import { SubmitLogout } from "../../api/auth";

export const LoginBtn = () => {
  const setLoginPopupOpen = useSetRecoilState(loginPopupOpenState); // 로그인 팝업 상태

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  return (
    <div
      className="lg:flex p-2 cursor-pointer border rounded-md hidden md:block hover:border-primary-1"
      onClick={openLoginPopup}
    >
      로그인 / 회원가입
    </div>
  );
};

export const LogoutBtn = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const handleLogout = () => {
    SubmitLogout();
    setAccessToken(null);
  };
  return (
    <div
      className="lg:flex p-2 cursor-pointer border rounded-md hidden md:block hover:border-primary-1"
      onClick={() => handleLogout()}
    >
      로그아웃
    </div>
  );
};
