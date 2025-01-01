import React from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  chatbotOpenState,
  loginPopupOpenState,
  userSignupPopupOpenState,
  agentSignupPopupOpenState,
  menuOpenState,
} from "./recoil/atoms";

import Header from "./components/header/header";
import Home from "./pages/home";
import RealPriceMap from "./pages/apt/realPriceMap";
import AreaSearchedPage from "./pages/apt/searchedPage";
import BoardPage from "./pages/board/boardPage";
import BoardDetailPage from "./pages/board/boardDetailPage";
import BoardPostPage from "./pages/board/boardPostPage";
import BoardUpdatePage from "./pages/board/boarUpdatePage";
import AptDetailPage from "./pages/apt/aptDetailPage";
import CharterMap from "./pages/charter/charterMap";
import CharterAreaSearchedPage from "./pages/charter/areaSearchedPage";
import CharterDetailPage from "./pages/charter/charterDetailPage";
import Dormitory from "./pages/dormitory";
import Mypage from "./pages/mypage";
import ErrorPage from "./pages/errorPage";

import LoginPopup from "./components/login/loginPopup";
import UserSignupPopup from "./components/signup/UserSignupPopup.tsx";
import AgentSignupPopup from "./components/signup/AgentSignupPopup.tsx";
import ChatbotBody from "./components/chatbot/chatbotBody";
import PopupBtn from "./components/chatbot/popupBtn";
import DropdownMenu from "./components/header/dropdownMenu";

const App = () => {
  const navigate = useNavigate();

  const [chatbotOpen, setChatbotOpen] = useRecoilState(chatbotOpenState);
  const [loginPopupOpen, setLoginPopupOpen] = useRecoilState(loginPopupOpenState);
  const [userSignupPopupOpen, setUserSignupPopupOpen] = useRecoilState(userSignupPopupOpenState);
  const [agentSignupPopupOpen, setAgentSignupPopupOpen] = useRecoilState(agentSignupPopupOpenState);
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState);

  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/realprice_map",
      children: [
        { index: true, element: <RealPriceMap /> },
        { path: "dong/:dongCode", element: <AreaSearchedPage /> },
        { path: "dong/:dongCode/:min/:max", element: <AreaSearchedPage /> },
        { path: "detail/:aptSeq", element: <AptDetailPage /> },
      ],
    },
    {
      path: "/charters",
      children: [
        { index: true, element: <CharterMap /> },
        { path: "dong/:dongCode", element: <CharterAreaSearchedPage /> },
        { path: "dong/:dongCode/:charterKind", element: <CharterAreaSearchedPage /> },
        {
          path: "dong/:dongCode/:depositMin/:depositMax",
          element: <CharterAreaSearchedPage />,
        },
        {
          path: "dong/:dongCode/:depositMin/:depositMax/:rentMin/:rentMax",
          element: <CharterAreaSearchedPage />,
        },
        {
          path: "detail/:charterId",
          element: <CharterDetailPage />,
        },
        {
          path: "college",
          children: [
            {
              path: ":collegeName/:dongCode",
              element: <CharterAreaSearchedPage />,
            },
            {
              path: ":collegeName/:dongCode/:charterKind",
              element: <CharterAreaSearchedPage />,
            },
            {
              path: "detail/:charterId",
              element: <CharterDetailPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/board",
      children: [
        { index: true, element: <BoardPage /> },
        { path: ":boardId", element: <BoardDetailPage /> },
        { path: "edit/:boardId", element: <BoardUpdatePage /> },
        { path: "post", element: <BoardPostPage /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPopup onClose={() => navigate("/")} />,
    },
    {
      path: "/dormitory",
      element: <Dormitory />,
    },
    {
      path: "/mypage",
      element: <Mypage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      {/* 공통 헤더 */}
      <Header />

      {/* useRoutes로 정의한 element */}
      {element}

      {/* 로그인 팝업 */}
      {loginPopupOpen && (
        <LoginPopup
          onClose={() => setLoginPopupOpen(false)}
          onMouseUp={(e) => e.preventDefault()}
        />
      )}

      {/* 일반 회원가입 팝업 */}
      {userSignupPopupOpen && <UserSignupPopup onClose={() => setUserSignupPopupOpen(false)} />}

      {/* 중개 회원가입 팝업 */}
      {agentSignupPopupOpen && <AgentSignupPopup onClose={() => setAgentSignupPopupOpen(false)} />}

      {/* 드롭다운 메뉴 */}
      {menuOpen && <DropdownMenu />}

      {/* 챗봇 */}
      <div className="relative z-10">
        {chatbotOpen && (
          <div className="fixed w-64 h-96 bottom-36 sm:bottom-64 right-28 sm:right-52">
            <ChatbotBody />
          </div>
        )}
        <PopupBtn />
      </div>
    </>
  );
};

export default App;
