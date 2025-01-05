import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

export function RedirectNaver() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    console.log(code);
    setLoading(true);
    // fetch(`보내줄 주소?code=${code}`, {
    //   method: "POST", //
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     console.log(data.result.user_id);
    //     console.log(data.result.jwt);
    //   })
    //   .catch((error) => {
    //     console.error("오류 발생", error); //
    //   });

    // API 요청 성공시 :콜백URL/redirect?code={code값}&state={state값}
    // API 요청 실패시 :콜백URL/redirect?state={state값}&error={에러코드값}&error_description={에러메시지}
  }, [code]);

  return (
    <div className="flex justify-center">
      <FadeLoader
        loading={loading}
        color="#4D63FC"
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.5}
      />
    </div>
  );
}

export default RedirectNaver;
