import React, { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  PasswordCheckInput,
  NicknameInput,
  GenderInput,
  ImageInput,
} from "../signup/inputs";
import { KakaoLoginBtn, GoogleLoginBtn, SignupBtn } from "../buttons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SubmitSignup } from "../../api/auth";
import { useRecoilState } from "recoil";
import { loginPopupOpenState, userSignupPopupOpenState } from "../../recoil/atoms";

const UserSignupPopup = ({ onClose }) => {
  const [userSignupPopupOpen, setUserSignupPopupOpen] = useRecoilState(userSignupPopupOpenState);
  const [loginPopupOpen, setLoginPopupOpen] = useRecoilState(loginPopupOpenState);

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

  const submitForm = async () => {
    // 모든 값이 입력되었는지 확인
    if (!nickname || !email || !password || !gender) {
      alert("정보를 다시 확인해주세요.");
      return;
    }
    try {
      const response = await SubmitSignup(email, password, nickname, gender, role, imgFile);
      console.log(response);
      setUserSignupPopupOpen(false);
      setLoginPopupOpen(false);
      setLoginPopupOpen(true);
      alert("회원가입 되었습니다. 로그인 해주세요 :)");
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <div
      className="w-full fixed inset-0 z-50 flex items-center justify-center bg-gray-1 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-white p-8 rounded-md shadow-md w-96 "
        onClick={(e) => e.stopPropagation()}
      >
        <FaArrowLeftLong onClick={toggleMenu} className="cursor-pointer" />
        <div className="text-xl self-center mb-2">개인회원 가입</div>
        <ImageInput imgFile={imgFile} setImgFile={setImgFile} />
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} />
        <PasswordCheckInput password={password} setPasswordCheck={setPasswordCheck} />
        <NicknameInput nickname={nickname} setNickname={setNickname} />
        <div className="flex flex-row">
          <GenderInput gender={gender} setGender={setGender} />
        </div>
        <SignupBtn onClick={submitForm} />
        <div className="border-b border-gray-2 my-2"></div>
        <KakaoLoginBtn className="my-2" />
        <GoogleLoginBtn className="my-2" />
      </div>
    </div>
  );
};

export default UserSignupPopup;

// private String email;
// private String password;
// private String nickname;
// private String gender;
// private Role role;
// private Image profile;
