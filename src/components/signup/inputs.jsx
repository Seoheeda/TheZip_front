import React, { useState, useRef } from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { checkEmail, checkNickname } from "../../api/auth.ts";
import { emailRegexCheck, passwordRegexCheck } from "../../utils/methods";
import {
  EMAIL_MENT,
  PASSWORD_MENT,
  PASSWORD_CHECK_MENT,
  NICKNAME_MENT,
  GENDER,
} from "../../utils/enum";
import basicProfile from "../../assets/imgs/basicProfile.jpg";

export const EmailInput = ({ email, setEmail }) => {
  const [emailCheck, setEmailCheck] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const submitForm = async (emailValue) => {
    try {
      const response = await checkEmail(emailValue);
      // 이메일이 형식에 맞지만, 사용 불가한 경우
      if (response.data === true) {
        setEmailCheck(2);
        // 이메일이 형식에 맞고, 사용 가능한 경우
      } else {
        setEmailCheck(3);
        setEmail(emailValue);
      }
      console.log(response.data);
    } catch (error) {
      console.log("이메일 확인에 실패했습니다.");
      console.log(error);
    }
  };
  const onEmailChange = (e) => {
    const emailValue = e.target.value;
    if (emailRegexCheck(emailValue) === true) {
      submitForm(emailValue);
      // 이메일이 입력되지 않은 경우
    } else if (emailValue.length === 0) {
      setEmailCheck(0);
    } else {
      // 이메일이 형식에 맞지 않는 경우
      setEmailCheck(1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        <input
          type="text"
          placeholder="이메일"
          className="border border-gray-1 h-9 rounded-md px-3 pr-8 mt-2 mb-1 text-sm" // 오른쪽 패딩 추가
          onChange={onEmailChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {emailCheck === 3 && (
          <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-1" />
        )}
      </div>
      {isFocused && <div className="text-xs px-1 text-primary-1">{EMAIL_MENT[emailCheck]}</div>}
    </div>
  );
};

export const PasswordInput = ({ setPassword }) => {
  const [passwordCheck, setPasswordCheck] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const onPasswordChange = (e) => {
    const passwordValue = e.target.value;
    if (passwordValue.length === 0) {
      setPasswordCheck(0);
      // 사용 가능한 비밀번호인 경우
    } else if (passwordRegexCheck(passwordValue) === true) {
      setPasswordCheck(2);
      setPassword(passwordValue);
    } else {
      // 비밀번호가 형식에 맞지 않는 경우
      setPasswordCheck(1);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        <input
          type="password"
          placeholder="비밀번호"
          className="border border-gray-1 h-9 rounded-md px-3 my-2 text-sm"
          onChange={onPasswordChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {passwordCheck === 2 && (
          <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-1" />
        )}
      </div>
      {isFocused && (
        <div className="text-xs px-1 text-primary-1">{PASSWORD_MENT[passwordCheck]}</div>
      )}
    </div>
  );
};

export const PasswordCheckInput = ({ password, setPasswordCheck }) => {
  const [passwordSameCheck, setPasswordSameCheck] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const onPasswordCheckChange = (e) => {
    const passwordCheckValue = e.target.value;
    console.log(password);
    if (passwordCheckValue.length === 0) {
      setPasswordSameCheck(0);
      // 비밀번호가 일치하는 경우
    } else if (passwordCheckValue === password) {
      setPasswordSameCheck(2);
      setPasswordCheck(passwordCheckValue);
    } else {
      // 비밀번호가 일치하지 않는 경우
      setPasswordSameCheck(1);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="border border-gray-1 h-9 rounded-md px-3 my-2 text-sm"
          onChange={onPasswordCheckChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {passwordSameCheck === 2 && (
          <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-1" />
        )}
      </div>
      {isFocused && (
        <div className="text-xs px-1 text-primary-1">{PASSWORD_CHECK_MENT[passwordSameCheck]}</div>
      )}
    </div>
  );
};

export const NicknameInput = ({ nickname, setNickname }) => {
  const [nicknameCheck, setNicknameCheck] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const submitForm = async (nicknameValue) => {
    try {
      const response = await checkNickname(nicknameValue);
      // 사용 불가한 경우
      if (response.data === true) {
        setNicknameCheck(2);
        // 사용 가능한 경우
      } else {
        setNicknameCheck(3);
        setNickname(nicknameValue);
      }
    } catch (error) {
      console.log("닉네임 확인에 실패했습니다.");
      console.log(error);
    }
  };
  const onNicknameChange = (e) => {
    setNickname(e.target.value);
    if (e.target.value.length === 0) {
      setNicknameCheck(0);
    } else if (e.target.value.length < 2 || e.target.value.length > 20) {
      setNicknameCheck(1);
    } else {
      submitForm(e.target.value);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          className="border border-gray-1 h-9 rounded-md px-3 my-2 text-sm"
          onChange={onNicknameChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {nicknameCheck === 3 && (
          <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-1" />
        )}
      </div>
      {isFocused && (
        <div className="text-xs px-1 text-primary-1">{NICKNAME_MENT[nicknameCheck]}</div>
      )}
    </div>
  );
};

export const GenderInput = ({ gender, setGender }) => {
  const onGenderChange = (e) => {
    setGender(GENDER[e.target.value]);
  };
  return (
    <div className="flex w-full my-5">
      <div className="flex w-[50%] space-x-3 ">
        <input
          type="radio"
          name="gender"
          checked={gender === "MALE"}
          value={0}
          onChange={onGenderChange}
        />
        <div>남성</div>
      </div>
      <div className="flex w-[50%] space-x-3">
        <input
          type="radio"
          name="gender"
          checked={gender === "FEMALE"}
          value={1}
          onChange={onGenderChange}
        />
        <div>여성</div>
      </div>
    </div>
  );
};

export const ImageInput = ({ imgFile, setImgFile, isMypage }) => {
  const imgRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);

  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];
      setImgFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
    }
  };

  const handleClickImage = () => {
    imgRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" onClick={handleClickImage}>
        {previewImg ? (
          <img
            src={previewImg}
            alt="Profile"
            className={`rounded-full mb-2 cursor-pointer ${isMypage ? "w-28 h-28" : "w-16 h-16"}`}
          />
        ) : (
          <img
            alt="Profile"
            className={`rounded-full mb-2 cursor-pointer ${isMypage ? "w-28 h-28" : "w-16 h-16"}`}
            src={basicProfile}
          />
        )}
        <FaCirclePlus
          className={`text-primary-1 absolute bottom-1 right-0 cursor-pointer ${
            isMypage ? "w-5 h-5 bottom-3 right-1" : "w-3 h-3 bottom-2 right-1"
          }`}
        />
      </div>
      <input type="file" accept="image/*" ref={imgRef} onChange={saveImgFile} className="hidden" />
    </div>
  );
};
