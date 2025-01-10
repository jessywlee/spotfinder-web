import {getAuthUrl} from "../utils/commonUtil.ts";
import {toast} from "react-toastify";

function KakaoLogin() {
  const handleKakaoLogin = () => {
    const kakaoUrl = getAuthUrl('K');
    if (kakaoUrl) {
      window.location.href = kakaoUrl;
    } else {
      toast.error('로그인 할 수 없습니다.')
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleKakaoLogin}>
      <img
        src="src/assets/kakao_login_large_narrow.png"
        width="260"
        height="50"
      />
    </div>
  );
}

export default KakaoLogin;
