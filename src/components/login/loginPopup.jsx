import React, { useState, useEffect } from "react";
import MotionFace from "./motionFace";
import { KakaoLoginBtn, GoogleLoginBtn, UserSignupBtn, AgentSignupBtn, LoginBtn } from "../buttons";
import { EmailInput, PasswordInput } from "./inputs";
import { useSetRecoilState } from "recoil";
import {
  userSignupPopupOpenState,
  agentSignupPopupOpenState,
  accessTokenState,
} from "../../recoil/atoms";
import { SubmitLogin } from "../../api/auth";

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitForm();
    }
  };

  return (
    <div
      className="w-full fixed inset-0 z-50 flex items-center justify-center bg-gray-1 bg-opacity-50"
      onClick={onClose} // 모달 내부 클릭 시 닫히지 않음
    >
      <div
        className="flex flex-col bg-white p-8 rounded-md shadow-md w-96 "
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중단
        }}
      >
        <div className="text-xl self-center mb-2">로그인</div>
        <div className="self-center mb-4">
          <MotionFace
            isPasswordFocus={isPasswordFocus}
            getEyeTransform={getEyeTransform}
            setEmailCursorX={setEmailCursorX}
          />
        </div>
        <div className="flex flex-col py-2 border-b">
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
            <UserSignupBtn openUserSignupPopup={() => setUserSignupPopupOpen(true)} />
            <AgentSignupBtn openAgentSignupPopup={() => setAgentSignupPopupOpen(true)} />
          </div>
        </div>
        <div className="flex flex-col my-4 space-y-2">
          <KakaoLoginBtn />
          <GoogleLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
