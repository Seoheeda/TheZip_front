import { useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import MainLogo from "./mainlogo";
import Menu from "./menu";
import { LoginBtn, LogoutBtn, MainUserNameBtn } from "./buttons";
import { menuOpenState, accessTokenState, userState } from "../../recoil/atoms";
import { getUserInfo } from "../../api/auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState); // 메뉴 열림 상태
  const accessToken = useRecoilValue(accessTokenState); // 로그인 상태 확인
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken !== null) {
        try {
          const response = await getUserInfo(accessToken);
          setUserInfo((prevState) => ({
            ...prevState,
            createdAt: response.data.createdAt,
            deletedAt: response.data.deletedAt,
            email: response.data.email,
            gender: response.data.gender,
            isBlocked: response.data.isBlocked,
            memberId: response.data.memberId,
            nickname: response.data.nickname,
            role: response.data.role,
            profile: response.data.profile.imageUrl,
          }));
        } catch (error) {
          console.log("유저 정보를 불러오는 데 실패했습니다:", error);
        }
      } else {
        setUserInfo(() => ({
          createdAt: "",
          deletedAt: null,
          email: null,
          gender: "",
          isBlocked: "",
          memberId: null,
          nickname: "",
          role: "",
          profile: null,
        }));
      }
    };
    fetchUserInfo();
  }, [accessToken, setUserInfo]);

  useEffect(() => {
    const handleResize = () => {
      const breakpoint = 1280; // Tailwind CSS의 lg breakpoint (1280px)
      if (window.innerWidth >= breakpoint && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // 초기 렌더링 시에도 체크
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <div className="min-w-[250px] px-5 h-20 w-full bg-white border-b border-gray-2 flex items-center justify-between shadow-sm text-lg">
      <div className="flex items-center">
        <MainLogo />
        <div className="hidden xl:flex space-x-8 mt-0.5">
          <Menu />
        </div>
      </div>
      {!menuOpen && (
        <div className="flex items-center">
          {accessToken !== null ? (
            <div className="hidden xl:flex items-center relative">
              <MainUserNameBtn nickname={userInfo.nickname} />
              <LogoutBtn />
            </div>
          ) : (
            <div className="hidden xl:block">
              <LoginBtn />
            </div>
          )}
        </div>
      )}
      <div className="xl:hidden cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
    </div>
  );
};

export default Header;
