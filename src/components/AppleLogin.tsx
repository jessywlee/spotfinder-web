import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLogin from "../api/hooks/useLogin.ts";
import { verifyLoginResponse } from "../utils/commonUtil.ts";
import { FadeLoader } from "react-spinners";

function AppleLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

      console.log(res);
      const code = res.authorization.code;

      if (code) {
        setLoading(true);
        fetchLogin({
          socialType: "A",
          authCode: code,
        })
          .then((response) => {
            const result = verifyLoginResponse(response);
            if (result === "REQ000") {
              setTimeout(() => {
                navigate("/delete-account?socialType=" + "A");
              }, 1000);
            } else if (result === "AUTH004") {
              toast.error("소셜 서비스의 회원 정보 조회를 실패했습니다.");
            } else if (result === "AUTH003") {
              toast.error(
                "인증에 실패했습니다. 다시 시도하거나 관리자에게 문의해 주세요."
              );
            } else if (result === "MBR000") {
              toast.error("회원 정보가 없습니다.");
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <FadeLoader
            loading={loading}
            color="#4D63FC"
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={0.5}
          />
        </div>
      )}
    </>
  );
}

export default AppleLogin;
