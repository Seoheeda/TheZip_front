import { SubmitKakaoLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, isKakaoLogin } from "../../recoil/atoms";
import { useEffect } from "react";

const Oauth2 = () => {
  const navigate = useNavigate(); // 컴포넌트 최상단에서 Hook 호출
  const setAccessToken = useSetRecoilState(accessTokenState); // 컴포넌트 최상단에서 Hook 호출
  const [kakaoLogin, setKakaoLogin] = useRecoilState(isKakaoLogin);

  const GetHeader = async () => {
    console.log("GetHeader");

    const response = await SubmitKakaoLogin(setKakaoLogin);

    localStorage.setItem("accessToken", response);
    setAccessToken(response);
    navigate("/"); // Hook 사용 가능
  };

  useEffect(() => {
    GetHeader(); // 컴포넌트가 마운트될 때 실행
  }, []);

  return <div>Header</div>;
};

export default Oauth2;
