import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import useLogin from "../../api/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function RedirectNaver() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const code = new URL(window.location.href).searchParams.get("code");
  const { mutateAsync: fetchLogin } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    setLoading(true);
    if (code) {
      fetchLogin({
        socialType: "N",
        authCode: code,
      })
        .then((response) => {
          if (response.data.code === "REQ000") {
            navigate("/delete-account");
          } else {
            navigate("/");
            toast.warn(
              "로그인 할 수 없습니다. 다시 시도하거나 관리자에게 문의해 보세요."
            );
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
  }, [code, fetchLogin, navigate]);

  return (
    <div className="flex justify-center">
      <FadeLoader
        loading={loading}
        color="#4D63FC"
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.5}
      />
      <ToastContainer />
    </div>
  );
}

export default RedirectNaver;
