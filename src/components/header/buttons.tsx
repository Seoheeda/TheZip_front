import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginPopupOpenState, accessTokenState } from "../../recoil/atoms";
import { SubmitLogout } from "../../api/auth";
import { AuthBtnProps, UserNameBtnProps } from "../../types/interfaces";

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

export const MainUserNameBtn: React.FC<UserNameBtnProps> = ({ nickname }) => {
  return (
    <>
      <Link to="/mypage">
        <span className="relative group">
          <div className="text-primary hover:underline">{nickname} 님</div>
        </span>
      </Link>
      <span className="ml-1 mr-4 text-gray-700">반갑습니다</span>
    </>
  );
};

export const MenuUserNameBtn: React.FC<UserNameBtnProps> = ({ nickname }) => {
  return (
    <Link to="/mypage">
      <div className="p-2 cursor-pointer border-b hover:text-primary-1">
        <span className="text-primary hover:underline">{nickname} 님</span>
        <span className="ml-1 mr-4 text-gray-700">반갑습니다</span>
      </div>
    </Link>
  );
};

export const AuthBtn: React.FC<AuthBtnProps> = ({ isLoggedIn, handleLogout, openLoginPopup }) => {
  return (
    <div
      className="p-3 cursor-pointer border rounded-md hover:text-primary-1"
      onClick={isLoggedIn ? handleLogout : openLoginPopup}
    >
      {isLoggedIn ? "로그아웃" : "로그인 / 회원가입"}
    </div>
  );
};
