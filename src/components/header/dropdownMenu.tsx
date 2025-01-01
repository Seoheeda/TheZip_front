import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  loginPopupOpenState,
  accessTokenState,
  userState,
  menuOpenState,
} from "../../recoil/atoms";
import { MenuUserNameBtn, AuthBtn } from "./buttons";
import { SubmitLogout } from "../../api/auth";
import Menu from "./menu";

const DropdownMenu = () => {
  const setLoginPopupOpen = useSetRecoilState(loginPopupOpenState); // 로그인 팝업 상태
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // 로그인 팝업 상태
  const setMenuOpen = useSetRecoilState(menuOpenState); // 메뉴 열림 상태
  const userInfo = useRecoilValue(userState);

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const handleLogout = () => {
    SubmitLogout();
    setAccessToken(null);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="xl:flex absolute top-20 left-0 w-full bg-white shadow-md z-10">
      {accessToken && <MenuUserNameBtn nickname={userInfo.nickname} />}
      <div className="flex flex-col space-y-3 p-3 xl:flex-row" onClick={toggleMenu}>
        <Menu />
      </div>
      <AuthBtn
        isLoggedIn={!!accessToken}
        handleLogout={handleLogout}
        openLoginPopup={openLoginPopup}
      />
    </div>
  );
};

export default DropdownMenu;
