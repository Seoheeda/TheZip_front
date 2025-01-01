import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <NavLink
        to="/realprice_map"
        className={({ isActive }) =>
          isActive ? "cursor-pointer text-primary-1" : "cursor-pointer hover:text-primary"
        }
      >
        실거래가 조회
      </NavLink>
      <NavLink
        to="/charters"
        className={({ isActive }) =>
          isActive ? "cursor-pointer text-primary-1" : "cursor-pointer hover:text-primary"
        }
      >
        월세/전세가 조회
      </NavLink>
      <NavLink
        to="/dormitory"
        className={({ isActive }) =>
          isActive ? "cursor-pointer text-primary-1" : "cursor-pointer hover:text-primary"
        }
      >
        기숙사와 비교하기
      </NavLink>
      <NavLink
        to="/board"
        className={({ isActive }) =>
          isActive ? "cursor-pointer text-primary-1" : "cursor-pointer hover:text-primary"
        }
      >
        공지사항
      </NavLink>
    </>
  );
};

export default Menu;
