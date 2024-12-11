import { REGEX_EMAIL, REGEX_PASS } from "./enum";

export const emailRegexCheck = (email) => REGEX_EMAIL.test(email);

export const passwordRegexCheck = (password) => REGEX_PASS.test(password);

export const formatToEokCheon = (numberString) => {
  let number; // number 변수를 함수 스코프에서 선언합니다.

  if (numberString && typeof numberString === "string") {
    number = parseInt(numberString.replace(/,/g, ""), 10);
  } else {
    number = numberString;
  }

  if (isNaN(number)) {
    console.warn("Failed to parse numberString:", numberString);
    return "0만원";
  }

  const eok = Math.floor(number / 10000);
  const cheon = Math.floor((number % 10000) / 10000);
  const remainder = number % 10000;

  let formatted = "";
  if (eok > 0) {
    formatted += `${eok}억 `;
  }
  if (cheon > 0) {
    formatted += `${cheon}천 `;
  }
  if (remainder > 0) {
    formatted += `${remainder.toLocaleString()}만원`;
  }

  return formatted.trim(); // 최종 결과 문자열 반환
};

export const formatToPeung = (meter) => {
  return meter / 3.306;
};

export const formatFloor = (floor) => {
  if (floor < 0) {
    return `지하${Math.abs(floor)}층`;
  } else {
    return `${floor}층`;
  }
};
