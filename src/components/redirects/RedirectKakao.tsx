import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import useLogin from "../../api/hooks/useLogin.ts";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {getLoginAction, LoginResponseCode, verifyLoginResponse} from "../../utils/commonUtil.ts";
import useUnlink from "../../api/hooks/useUnlink.ts";

export function RedirectKakao() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");
  const { mutateAsync: fetchLogin } = useLogin();
  const { mutateAsync: fetchUnlink } = useUnlink();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthError = (message?: string) => {
      toast.error(
        message ||
          "인증에 실패했습니다. 다시 시도하거나 관리자에게 문의해 보세요."
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };

    const handleLogin = async (code: string) => {
      try {
        setLoading(true);
        const response = await fetchLogin({
          socialType: "K",
          authCode: code,
        });
        const result = verifyLoginResponse(response);
        const action = getLoginAction(result as LoginResponseCode)

        if (action.message) {
          toast.error(action.message);
        }

        if (action.navigateTo) {
          setTimeout(() => {
            const url = action.navigateTo('K');
            navigate(url);
          }, 1000);
        }

      } catch (err) {
        console.error(err);
        handleAuthError();
      } finally {
        setLoading(false);
      }
    };

    const handleUnlink = async (code: string) => {
      try {
        setLoading(true);
        const response = await fetchUnlink({ authCode: code });
        if (response.data.code === "REQ000") {
          setTimeout(() => {
            navigate("/delete-account?success=true");
          }, 1000);
        } else {
          toast.error(
            "회원 탈퇴에 실패하였습니다. 다시 시도하거나 관리자에게 문의해 주세요."
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        console.error(err);
        handleAuthError();
      } finally {
        setLoading(false);
      }
    };

    const processAuth = () => {
      if (!code) {
        handleAuthError();
        return;
      }

      switch (state) {
        case "login":
          void handleLogin(code);
          break;
        case "unlink":
          void handleUnlink(code);
          break;
        default:
          handleAuthError();
          break;
      }
    };

    console.log(window.location.href); // Debugging log
    processAuth();
  }, [code, state, fetchLogin, fetchUnlink, navigate]);

  return (
    <div className="flex justify-center">
      <FadeLoader
        loading={loading}
        color="#4D63FC"
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.5}
      />
      <ToastContainer position="bottom-center" theme="colored" />
    </div>
  );
}

export default RedirectKakao;
