import React from "react";
import { Routes, Route } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [chatbotOpen, setChatbotOpen] = useRecoilState(chatbotOpenState);
  const [loginPopupOpen, setLoginPopupOpen] = useRecoilState(loginPopupOpenState);
  const [userSignupPopupOpen, setUserSignupPopupOpen] = useRecoilState(userSignupPopupOpenState);
  const [agentSignupPopupOpen, setAgentSignupPopupOpen] = useRecoilState(agentSignupPopupOpenState);
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState); // 메뉴 열림 상태

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/realprice_map" element={<RealPriceMap />} />
        <Route path="/realprice_map/dong/:dongCode" element={<AreaSearchedPage />} />
        <Route path="/realprice_map/dong/:dongCode/:min/:max" element={<AreaSearchedPage />} />
        <Route path="/realprice_map/detail/:aptSeq" element={<AptDetailPage />} />
        <Route path="/charters" element={<CharterMap />} />
        <Route path="/charters/dong/:dongCode" element={<CharterAreaSearchedPage />} />
        <Route path="/charters/dong/:dongCode/:charterKind" element={<CharterAreaSearchedPage />} />
        <Route
          path="/charters/dong/:dongCode/:depositMin/:depositMax"
          element={<CharterAreaSearchedPage />}
        />
        <Route
          path="/charters/dong/:dongCode/:depositMin/:depositMax/:rentMin/:rentMax"
          element={<CharterAreaSearchedPage />}
        />
        <Route
          path="/charters/college/:collegeName/:dongCode"
          element={<CharterAreaSearchedPage />}
        />
        <Route
          path="/charters/college/:collegeName/:dongCode/:charterKind"
          element={<CharterAreaSearchedPage />}
        />
        <Route path="/charters/detail/:charterId" element={<CharterDetailPage />} />
        <Route path="/charters/college/detail/:charterId" element={<CharterDetailPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board/:boardId" element={<BoardDetailPage />} />
        <Route path="/board/edit/:boardId" element={<BoardUpdatePage />} />
        <Route path="/board/post" element={<BoardPostPage />} />
        <Route path="/login" element={<LoginPopup onClose={() => navigate("/")} />} />
        <Route path="/dormitory" element={<Dormitory />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {loginPopupOpen && (
        <LoginPopup
          onClose={() => setLoginPopupOpen(false)}
          onMouseUp={(e) => e.preventDefault()}
        />
      )}
      {userSignupPopupOpen && <UserSignupPopup onClose={() => setUserSignupPopupOpen(false)} />}
      {agentSignupPopupOpen && <AgentSignupPopup onClose={() => setAgentSignupPopupOpen(false)} />}
      {menuOpen && <DropdownMenu />}
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
