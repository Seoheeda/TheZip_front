import React, { useState, useRef, FC } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { checkEmail, checkNickname } from "../../api/auth";
import { emailRegexCheck, passwordRegexCheck } from "../../utils/methods.js";
import {
  EMAIL_MENT,
  PASSWORD_MENT,
  PASSWORD_CHECK_MENT,
  NICKNAME_MENT,
  GENDER,
  EmailCheckStatus,
  PasswordCheckStatus,
} from "../../utils/enum";
import basicProfile from "../../assets/imgs/basicProfile.jpg";
import {
  EmailInputProps,
  PasswordInputProps,
  PasswordCheckInputProps,
  NicknameInputProps,
  GenderInputProps,
  ImageInputProps,
} from "../../types/interfaces";

export const EmailInput: FC<EmailInputProps> = ({ setEmail }) => {
  const [emailCheck, setEmailCheck] = useState<EmailCheckStatus>(EmailCheckStatus.EMPTY);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const submitForm = async (emailValue: string) => {
    try {
      const data: boolean = await checkEmail(emailValue);
      // 이메일이 형식에 맞지만, 사용 불가한 경우
      if (data === true) {
        setEmailCheck(EmailCheckStatus.UNAVAILABLE);
        // 이메일이 형식에 맞고, 사용 가능한 경우
      } else {
        setEmailCheck(EmailCheckStatus.AVAILABLE);
        setEmail(emailValue);
      }
    } catch (error) {
      console.log("이메일 확인에 실패했습니다.");
      console.log(error);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue: string = e.target.value;
    if (emailRegexCheck(emailValue) === true) {
      submitForm(emailValue);
      // 이메일이 입력되지 않은 경우
    } else if (emailValue.length === 0) {
      setEmailCheck(EmailCheckStatus.EMPTY);
    } else {
      // 이메일이 형식에 맞지 않는 경우
      setEmailCheck(EmailCheckStatus.INVALID_FORMAT);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        <input
          type="text"
          placeholder="이메일"
          className="border border-gray-1 h-9 rounded-md px-3 pr-8 mt-2 mb-1 text-sm"
          onChange={onEmailChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {emailCheck === EmailCheckStatus.AVAILABLE && (
          <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-1" />
        )}
      </div>
      {isFocused && <div className="text-xs px-1 text-primary-1">{EMAIL_MENT[emailCheck]}</div>}
    </div>
  );
};

export const PasswordInput: FC<PasswordInputProps> = ({ setPassword }) => {
  const [passwordCheck, setPasswordCheck] = useState<PasswordCheckStatus>(
    PasswordCheckStatus.EMPTY
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue: string = e.target.value;
    if (passwordValue.length === 0) {
      setPasswordCheck(PasswordCheckStatus.EMPTY);
      // 사용 가능한 비밀번호인 경우
    } else if (passwordRegexCheck(passwordValue) === true) {
      setPasswordCheck(PasswordCheckStatus.VALID);
      setPassword(passwordValue);
    } else {
      // 비밀번호가 형식에 맞지 않는 경우
      setPasswordCheck(PasswordCheckStatus.INVALID_FORMAT);
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
        {passwordCheck === PasswordCheckStatus.VALID && (
          <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-1" />
        )}
      </div>
      {isFocused && (
        <div className="text-xs px-1 text-primary-1">{PASSWORD_MENT[passwordCheck]}</div>
      )}
    </div>
  );
};

export const PasswordCheckInput: FC<PasswordCheckInputProps> = ({ password, setPasswordCheck }) => {
  const [passwordSameCheck, setPasswordSameCheck] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onPasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCheckValue: string = e.target.value;
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

export const NicknameInput: FC<NicknameInputProps> = ({ nickname, setNickname }) => {
  const [nicknameCheck, setNicknameCheck] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const submitForm = async (nicknameValue: string) => {
    try {
      const data: boolean = await checkNickname(nicknameValue);
      // 사용 불가한 경우
      if (data === true) {
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

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    // 닉네임을 입력하지 않은 경우
    if (e.target.value.length === 0) {
      setNicknameCheck(0);
      // 닉네임 글자수가 조건에 맞지 않는 경우
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

export const GenderInput: FC<GenderInputProps> = ({ gender, setGender }) => {
  const onGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value as GENDER);
  };
  return (
    <div className="flex w-full my-5">
      <div className="flex w-[50%] space-x-3 ">
        <input
          type="radio"
          name="gender"
          checked={gender === "MALE"}
          value={GENDER.MALE}
          onChange={onGenderChange}
        />
        <div>남성</div>
      </div>
      <div className="flex w-[50%] space-x-3">
        <input
          type="radio"
          name="gender"
          checked={gender === "FEMALE"}
          value={GENDER.FEMALE}
          onChange={onGenderChange}
        />
        <div>여성</div>
      </div>
    </div>
  );
};

export const ImageInput: FC<ImageInputProps> = ({ setImgFile, isMypage = false }) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];
      setImgFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
    }
  };

  const handleClickImage = () => {
    imgRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" onClick={handleClickImage}>
        {previewImg ? (
          <img
            src={previewImg}
            alt="Profile"
            className={`rounded-full my-2 cursor-pointer ${isMypage ? "w-28 h-28" : "w-20 h-20"}`}
          />
        ) : (
          <img
            alt="Profile"
            className={`rounded-full my-2 cursor-pointer ${isMypage ? "w-28 h-28" : "w-20 h-20"}`}
            src={basicProfile}
          />
        )}
        <FaCirclePlus
          className={`text-primary-1 absolute bottom-1 right-0 cursor-pointer ${
            isMypage ? "w-5 h-5 bottom-3 right-1" : "w-4 h-4 bottom-2 right-0"
          }`}
        />
      </div>
      <input type="file" accept="image/*" ref={imgRef} onChange={saveImgFile} className="hidden" />
    </div>
  );
};
