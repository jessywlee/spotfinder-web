import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import useLogin from "../api/hooks/useLogin.ts";
import {verifyLoginResponse} from "../utils/commonUtil.ts";

function AppleLogin() {
  const navigate = useNavigate();
  const { mutateAsync: fetchLogin } = useLogin();
  useEffect(() => {
    const CLEINT_ID = import.meta.env.VITE_A_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_A_REDIRECT_URI;
    window.AppleID.auth.init({
      clientId: CLEINT_ID,
      scope: "name email",
      redirectURI: REDIRECT_URI,
      state: "login",
      nonce: "[NONCE]",
      usePopup: true,
    });
  }, []);
  const handleLoginApple = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const res = await window.AppleID.auth.signIn();
      const code = res.authorization.code;

      if (code) {
        fetchLogin({
          socialType: "A",
          authCode: code,
        })
          .then((response) => {
            const result = verifyLoginResponse(response, navigate, 'A')
            if (result === 'AUTH004') {
              toast.error("소셜 서비스의 회원 정보 조회를 실패했습니다.");
              // setTimeout(() => {
              //   navigate("/");
              // }, 2000)
            } else if (result === 'AUTH003') {

              toast.error("인증에 실패했습니다. 다시 시도하거나 관리자에게 문의해 주세요.");
              // setTimeout(() => {
              //   navigate("/");
              // }, 2000)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        navigate("/");
        toast.warn(
          "로그인 할 수 없습니다. 다시 시도하거나 관리자에게 문의해 보세요."
        );
      }
    } catch (error) {
      console.log(error);
      navigate("/");
      toast.error("로그인에 실패하였습니다. 다시 시도해주세요");
    }
  };
  return (
    <>
      <div
        id="appleid-signin"
        className="w-[260px] h-[64px] cursor-pointer text-lg"
        data-color="black"
        data-border="true"
        data-type="sign-in"
        onClick={(e) => handleLoginApple(e)}
      ></div>
    </>
  );
}

export default AppleLogin;
