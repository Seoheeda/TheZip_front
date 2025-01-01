import React, { useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import MainLogo from "./mainlogo.tsx";
import { LoginBtn, LogoutBtn } from "./buttons";
import { menuOpenState, accessTokenState, userState } from "../../recoil/atoms";
import { Link, useLocation } from "react-router-dom";
import { getUserInfo } from "../../api/auth.ts";

const Header = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState); // 메뉴 열림 상태
  const accessToken = useRecoilValue(accessTokenState); // 로그인 상태 확인
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const location = useLocation(); // 현재 경로 확인

  const realPriceStyle =
    location.pathname.startsWith("/realprice_map") && "text-primary-1 ";
  const charterStyle =
    location.pathname.startsWith("/charters") &&
    !location.pathname.startsWith("/charters/college") &&
    "text-primary-1 ";
  const boardStyle =
    location.pathname.startsWith("/board") && "text-primary-1 ";
  const dormitoryStyle =
    (location.pathname.startsWith("/dormitory") ||
      location.pathname.startsWith("/charters/college")) &&
    "text-primary-1 ";

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken !== null) {
        try {
          const response = await getUserInfo(accessToken);
          console.log(response);
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
      const breakpoint = 1024; // Tailwind CSS의 lg breakpoint (1024px)
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
  }, [menuOpen]);

  return (
    <div className="min-w-[250px] px-5 h-20 w-full bg-white border-b border-gray-2 flex items-center justify-between shadow-sm text-lg">
      <div className="flex flex-row items-center">
        <MainLogo />
        <div className="hidden xl:flex pt-0.5">
          <Link to="/realprice_map">
            <div
              className={`mx-4 cursor-pointer hover:text-primary ${realPriceStyle}`}
            >
              실거래가 조회
            </div>
          </Link>
          <Link to="/charters">
            <div
              className={`mx-4 cursor-pointer hover:text-primary ${charterStyle}`}
            >
              월세/전세가 조회
            </div>
          </Link>
          <Link to="/dormitory">
            <div
              className={`mx-4 cursor-pointer hover:text-primary ${dormitoryStyle}`}
            >
              기숙사와 비교하기
            </div>
          </Link>
          <Link to="/board">
            <div
              className={`mx-4 cursor-pointer hover:text-primary ${boardStyle}`}
            >
              공지사항
            </div>
          </Link>
        </div>
      </div>
      {!menuOpen && (
        <div className="flex items-center">
          {accessToken !== null ? (
            <div className="hidden xl:flex items-center relative">
              <Link to="/mypage">
                <span className="relative group">
                  <div className="text-primary hover:underline">
                    {userInfo.nickname} 님
                  </div>
                </span>
              </Link>
              <span className="ml-1 mr-4 text-gray-700">반갑습니다</span>
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
