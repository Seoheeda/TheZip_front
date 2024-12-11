import React, { useEffect, useRef } from "react";
import Hero from "../components/home/hero";
import Aside from "../components/home/aside";
import MapCur from "../components/home/MapCur";
import Populars from "../components/home/populars";
import Footer from "../components/home/Footer";
import { SubmitLoginWithCookie } from "../api/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, isKakaoLogin } from "../recoil/atoms";

const Home = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const asideRef = useRef(null); // Aside를 참조하기 위한 ref

  const GetHeader = async () => {
    const response = await SubmitLoginWithCookie();

    localStorage.setItem("accessToken", response);
    setAccessToken(response);
  };

  useEffect(() => {
    if (localStorage.getItem("oauth2") === "true") {
      GetHeader();
      console.log("i am here");
    }
  }, []);

  // Hero에서 전달된 버튼 클릭 시 Aside로 스크롤 이동
  const scrollToAside = () => {
    asideRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-auto bg-gradient-to-b from-gray-100 to-gray-200">
      {/* scrollToAside를 Hero로 전달 */}
      <Hero onButtonClick={scrollToAside} />
      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8" ref={asideRef}>
          {/* Aside를 참조 */}
          <Aside />
          <div className="flex-1 space-y-8">
            <div className="w-full h-96 rounded-2xl border border-gray-2 overflow-hidden">
              <MapCur />
            </div>
            <div className="w-full">
              <Populars />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
