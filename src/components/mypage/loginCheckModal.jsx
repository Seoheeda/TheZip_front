import React from "react";
import { SubmitLogin } from "../../api/auth.ts";

const LoginCheckModal = ({
  isOpen,
  onClose,
  username,
  password,
  setPassword,
  setIsPasswordChecked,
}) => {
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
  };

  if (!isOpen) return null;

  const handleSubmit = async () => {
    console.log(username);
    // 모든 값이 입력되었는지 확인
    if (!username || !password) {
      alert("정보를 입력해주세요.");
      return;
    }
    try {
      const response = await SubmitLogin(username, password);
      console.log(response);

      alert("비밀번호를 변경해주세요.");
      onClose();
      setIsPasswordChecked(true);
    } catch (error) {
      alert("로그인 정보 확인에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // 바깥 영역 클릭 시 닫기
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full"
        onClick={handleModalClick} // 모달 내부 클릭은 이벤트 전파 방지
      >
        <h2 className="text-center text-md mb-4">로그인 확인</h2>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            type="text"
            placeholder="이메일"
            value={username}
            readOnly
            className="border border-gray-1 h-9 w-full rounded-md px-3 my-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호"
            className="border border-gray-1 h-9 w-full rounded-md px-3 my-2 text-sm"
            onChange={onPasswordChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary-2 text-white p-2 rounded-md hover:bg-primary-3"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCheckModal;
