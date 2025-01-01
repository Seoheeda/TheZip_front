import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu: React.FC = () => {
  const location = useLocation(); // 현재 경로 확인

  // 현재 위치 메뉴 색상
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

  return (
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
        <div className={`mx-4 cursor-pointer hover:text-primary ${boardStyle}`}>
          공지사항
        </div>
      </Link>
    </div>
  );
};

export default Menu;
