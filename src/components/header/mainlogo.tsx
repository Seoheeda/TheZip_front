import React from "react";
import { useNavigate } from "react-router-dom";
import mainlogo from "../../assets/imgs/mainlogo.png";

const MainLogo: React.FC = () => {
  const navigate = useNavigate();

  const onClickLogo = (): void => {
    navigate(`/`);
  };

  return (
    <div className="pt-2 h-20 border-b border-gray-2 flex items-center justify-between">
      <img
        src={mainlogo}
        onClick={onClickLogo}
        alt="notice"
        className="mr-3 h-15 w-40 cursor-pointer"
      />
    </div>
  );
};

export default MainLogo;
