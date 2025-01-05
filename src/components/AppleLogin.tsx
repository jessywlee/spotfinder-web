import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AppleLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const CLEINT_ID = import.meta.env.VITE_A_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_A_REDIRECT_URI;
    window.AppleID.auth.init({
      clientId: CLEINT_ID,
      scope: "name email",
      redirectURI: REDIRECT_URI,
      state: "origin:web",
      nonce: "[NONCE]",
      usePopup: true,
    });
  }, []);
  const handleLoginApple = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const res = await window.AppleID.auth.signIn();
      console.log(res);
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
      <ToastContainer />
    </>
  );
}

export default AppleLogin;
