import { GENDER } from "../utils/enum";

export interface EmailInputProps {
  setEmail: (email: string) => void;
}

export interface PasswordInputProps {
  setPassword: (password: string) => void;
}

export interface PasswordCheckInputProps {
  password: string;
  setPasswordCheck: (password: string) => void;
}

export interface NicknameInputProps {
  nickname: string;
  setNickname: (nickname: string) => void;
}

export interface GenderInputProps {
  gender: string;
  setGender: (gender: GENDER) => void;
}

export interface ImageInputProps {
  isMypage?: boolean;
  setImgFile: (imgFile: File | null) => void;
}
