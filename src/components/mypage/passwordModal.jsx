import React, { useState } from "react";
import { PasswordInput, PasswordCheckInput } from "../../components/signup/inputs";
import { changePassword } from "../../api/auth";

const PasswordChangeModal = ({ isOpen, onClose, password, setPassword, setIsPasswordChecked }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    // 모든 값이 입력되었는지 확인
    if (newPassword !== password) {
      alert("정보를 다시 확인해주세요.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await changePassword(password, accessToken);
      console.log(response);
      alert("변경되었습니다 :)");
      setIsPasswordChecked(false);
      onClose();
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.log(error);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // 바깥 영역 클릭 시 닫기
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full"
        onClick={handleModalClick} // 모달 내부 클릭은 이벤트 전파 방지
      >
        <h2 className="text-center text-md mb-4">비밀번호 변경하기</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">새 비밀번호</label>
          <PasswordInput setPassword={setPassword} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">새 비밀번호 확인</label>
          <PasswordCheckInput password={password} setPasswordCheck={setNewPassword} />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2">
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary-2 text-white p-2 rounded-md hover:bg-primary-3"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
