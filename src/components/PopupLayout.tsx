import React, { FC, ReactNode, useRef, useEffect, useState } from "react";

interface PopupLayoutProps {
  onClose: () => void;
  children: ReactNode;
}

const PopupLayout: FC<PopupLayoutProps> = ({ onClose, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  // 바깥 영역 클릭 여부 확인
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      // 팝업 내부를 클릭했는지, 외부를 클릭했는지 판별
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOutsideClick(true);
      } else {
        setIsOutsideClick(false);
      }
    };

    // 클릭이 끝났을 때(마우스 떼었을 때), 바깥에서 시작된 클릭이면 onClose
    const handleMouseUp = () => {
      if (isOutsideClick) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOutsideClick, onClose]);

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-gray-1 bg-opacity-50">
      <div
        ref={popupRef}
        className="flex flex-col bg-white p-8 rounded-md shadow-md w-96"
      >
        {children}
      </div>
    </div>
  );
};

export default PopupLayout;
