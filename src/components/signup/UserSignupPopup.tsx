import React, { useState, FC } from "react";
import PopupLayout from "../PopupLayout.tsx";
import {
  EmailInput,
  PasswordInput,
  PasswordCheckInput,
  NicknameInput,
  GenderInput,
  ImageInput,
} from "./inputs.jsx";
import { KakaoLoginBtn, GoogleLoginBtn, SignupBtn } from "../buttons.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SubmitSignup } from "../../api/auth.ts";
import { useSetRecoilState } from "recoil";
import { loginPopupOpenState, userSignupPopupOpenState } from "../../recoil/atoms.js";

interface UserSignupPopupProps {
  onClose: () => void; 
} 

const UserSignupPopup: FC<UserSignupPopupProps> = ({ onClose }) => {
  const setUserSignupPopupOpen = useSetRecoilState(userSignupPopupOpenState);
  const setLoginPopupOpen = useSetRecoilState(loginPopupOpenState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("MALE");
  const [imgFile, setImgFile] = useState(null);
  const role = "ROLE_USER";

  const toggleMenu = () => {
    setUserSignupPopupOpen(false);
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
      setUserSignupPopupOpen(false);
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
      <div className="text-xl self-center mb-2">개인회원 가입</div>
      <ImageInput setImgFile={setImgFile} />
      <EmailInput setEmail={setEmail} />
      <PasswordInput setPassword={setPassword} />
      <PasswordCheckInput password={password} setPasswordCheck={setPasswordCheck} />
      <NicknameInput nickname={nickname} setNickname={setNickname} />
      <GenderInput gender={gender} setGender={setGender} />
      <SignupBtn onClick={submitForm} />
      <div className="border-b border-gray-2 my-2"/>
      <KakaoLoginBtn/>
      <GoogleLoginBtn />
    </PopupLayout>
  );
};

export default UserSignupPopup;