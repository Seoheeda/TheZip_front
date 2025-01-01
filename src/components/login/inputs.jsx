import React from "react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
export const EmailInput = ({
  setIsEmailFocus,
  setIsPasswordFocus,
  setIsEmailInput,
  setEmailCursorX,
  setEmail,
  email,
}) => {
  const handleEmailFocus = () => {
    setIsEmailFocus(true);
    setIsPasswordFocus(false);
  };

  const handleEmailBlur = () => {
    setIsEmailFocus(false);
    setIsEmailInput(false);
  };

  const onEmailChange = (e) => {
    setIsEmailInput(e.target.value.length > 0);
    setEmail(e.target.value);
  };

  const handleEmailMouseMove = (e) => {
    const inputRect = e.target.getBoundingClientRect();
    setEmailCursorX((e.clientX - inputRect.left) / inputRect.width);
  };
  return (
    <input
      type="text"
      placeholder="이메일"
      className="border border-gray-1 h-9 rounded-md px-3 my-2 text-sm"
      onFocus={handleEmailFocus}
      onBlur={handleEmailBlur}
      onMouseMove={handleEmailMouseMove}
      onChange={onEmailChange}
      value={email}
    />
  );
};

export const PasswordInput = ({
  setIsPasswordFocus,
  setIsEmailFocus,
  setPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordFocus = () => {
    setIsPasswordFocus(true);
    setIsEmailFocus(false);
  };

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="비밀번호"
        className="border border-gray-1 h-9 w-full rounded-md px-3 my-2 text-sm"
        onFocus={handlePasswordFocus}
        onBlur={() => setIsPasswordFocus(false)}
        onChange={onPasswordChange}
      />
      <button
        type="button"
        onClick={handlePasswordVisibilityToggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
      >
        {isPasswordVisible ? (
          <IoEyeOff className="text-gray-600" />
        ) : (
          <IoEye className="text-gray-600" />
        )}
      </button>
    </div>
  );
};
