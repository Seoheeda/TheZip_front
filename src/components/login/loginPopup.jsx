import React, { useState, useEffect } from "react";
import MotionFace from "./motionFace";
import PopupLayout from "../PopupLayout.tsx";
import {
  KakaoLoginBtn,
  GoogleLoginBtn,
  UserSignupBtn,
  AgentSignupBtn,
  LoginBtn,
} from "../buttons";
import { EmailInput, PasswordInput } from "./inputs";
import { useSetRecoilState } from "recoil";
import {
  userSignupPopupOpenState,
  agentSignupPopupOpenState,
  accessTokenState,
} from "../../recoil/atoms";
import { SubmitLogin } from "../../api/auth.ts";

const LoginPopup = ({ onClose }) => {
  const setUserSignupPopupOpen = useSetRecoilState(userSignupPopupOpenState);
  const setAgentSignupPopupOpen = useSetRecoilState(agentSignupPopupOpenState);
  const setAccessToken = useSetRecoilState(accessTokenState);

  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isEmailInput, setIsEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCursorX, setEmailCursorX] = useState(0);
  const [isEmailRemembered, setIsEmailRemembered] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsEmailRemembered(true);
    }
  }, []);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === "Enter") {
        submitForm();
      }
    };

    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [email, password]);

  const getEyeTransform = () => {
    if (isEmailFocus && isEmailInput) {
      return "translate(0,3)";
    } else if (isEmailFocus) {
      return `translate(${(emailCursorX - 0.5) * 5}, 0)`;
    }
    return "";
  };

  const submitForm = async () => {
    // 모든 값이 입력되었는지 확인
    if (!email || !password) {
      alert("정보를 입력해주세요.");
      return;
    }
    try {
      const response = await SubmitLogin(email, password);
      console.log(response);
      localStorage.setItem("accessToken", response);

      setAccessToken(response);

      if (isEmailRemembered) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }
      alert("반갑습니다 :)");
      onClose();
    } catch (error) {
      alert("로그인에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <PopupLayout onClose={onClose}>
      <div className="text-xl self-center mb-2">로그인</div>
      <MotionFace
        isPasswordFocus={isPasswordFocus}
        getEyeTransform={getEyeTransform}
        setEmailCursorX={setEmailCursorX}
      />
      <EmailInput
        setIsEmailFocus={setIsEmailFocus}
        setIsPasswordFocus={setIsPasswordFocus}
        setIsEmailInput={setIsEmailInput}
        setEmailCursorX={setEmailCursorX}
        setEmail={setEmail}
        email={email}
      />
      <PasswordInput
        setIsPasswordFocus={setIsPasswordFocus}
        setIsEmailFocus={setIsEmailFocus}
        setPassword={setPassword}
      />
      <div className="flex justify-between my-2 flex-col xs:flex-row">
        <div className="flex">
          <input
            type="checkbox"
            className="w-3"
            checked={isEmailRemembered}
            onChange={() => setIsEmailRemembered(!isEmailRemembered)}
          />
          <span className="mx-2 text-sm">이메일 기억하기</span>
        </div>
        <div className="text-sm underline cursor-pointer active:text-primary-1">
          이메일/비밀번호 찾기
        </div>
      </div>
      <LoginBtn onClick={submitForm} />
      <div className="flex justify-evenly space-x-2">
        <UserSignupBtn
          openUserSignupPopup={() => setUserSignupPopupOpen(true)}
        />
        <AgentSignupBtn
          openAgentSignupPopup={() => setAgentSignupPopupOpen(true)}
        />
      </div>
      <div className="border-b border-gray-2 my-2" />
      <KakaoLoginBtn />
      <GoogleLoginBtn />
    </PopupLayout>
  );
};

export default LoginPopup;
