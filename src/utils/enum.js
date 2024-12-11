export const REGEX_EMAIL = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

export const REGEX_PASS = new RegExp("^(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()-+=<>?]).{8,20}$");

export const REGEX_NICK = new RegExp("^[^\\s]{2,15}$");

export const GENDER = ["MALE", "FEMALE"];

export const EMAIL_MENT = ["", "이메일이 형식에 맞지 않습니다.", "이미 가입된 이메일입니다.", "사용 가능한 이메일입니다."]

export const PASSWORD_MENT = ["", "8자리 이상의 영문, 숫자, 특수문자를 조합하여 입력해주세요.", "사용 가능한 비밀번호입니다."]

export const PASSWORD_CHECK_MENT = ["", "비밀번호가 일치하지 않습니다.", "비밀번호가 일치합니다."]

export const NICKNAME_MENT = ["", "닉네임은 2~20자로 입력해주세요.", "이미 사용중인 닉네임입니다.", "사용 가능한 닉네임입니다."]

export const COMPARE_OPTIONS = ["내 관심 전세",  "내 관심 월세"];

