import React, { useState, FC } from "react";
import PopupLayout from "../PopupLayout";
import {
  EmailInput,
  PasswordInput,
  PasswordCheckInput,
  NicknameInput,
  GenderInput,
  ImageInput,
} from "./inputs";
import { KakaoLoginBtn, GoogleLoginBtn, SignupBtn } from "../buttons.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SubmitSignup } from "../../api/auth";
import { useSetRecoilState } from "recoil";
import {
  loginPopupOpenState,
  agentSignupPopupOpenState,
} from "../../recoil/atoms.js";

interface AgentSignupPopupProps {
  onClose: () => void;
}

const AgentSignupPopup: FC<AgentSignupPopupProps> = ({ onClose }) => {
  const setAgentSignupPopupOpen = useSetRecoilState(agentSignupPopupOpenState);
  const setLoginPopupOpen = useSetRecoilState(loginPopupOpenState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<string>("MALE");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const role = "ROLE_AGENT";

  const toggleMenu = () => {
    setAgentSignupPopupOpen(false);
    setLoginPopupOpen(true);
  };

  const submitForm = async (): Promise<void> => {
    // 모든 값이 입력되었는지 확인
    if (!nickname || !email || !passwordCheck || !gender) {
      alert("정보를 다시 확인해주세요.");
      return;
    }
    try {
      await SubmitSignup(email, passwordCheck, nickname, gender, role, imgFile);
      setAgentSignupPopupOpen(false);
      setLoginPopupOpen(true);
      alert("회원가입 되었습니다. 로그인 해주세요 :)");
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <PopupLayout onClose={onClose}>
      <FaArrowLeftLong onClick={toggleMenu} className="cursor-pointer" />
      <div className="text-xl self-center my-1">중개회원 가입</div>
      <ImageInput setImgFile={setImgFile} />
      <EmailInput setEmail={setEmail} />
      <PasswordInput setPassword={setPassword} />
      <PasswordCheckInput
        password={password}
        setPasswordCheck={setPasswordCheck}
      />
      <NicknameInput nickname={nickname} setNickname={setNickname} />
      <GenderInput gender={gender} setGender={setGender} />
      <SignupBtn onClick={submitForm} />
      <div className="border-b border-gray-2 my-2" />
      <KakaoLoginBtn />
      <GoogleLoginBtn />
    </PopupLayout>
  );
};

export default AgentSignupPopup;
