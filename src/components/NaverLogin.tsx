import {getAuthUrl} from "../utils/commonUtil.ts";
import {toast} from "react-toastify";

function NaverLogin() {
  const handleNaverLogin = () => {
    const naverUrl = getAuthUrl('N');
    if (naverUrl) {
      window.location.href = naverUrl;
    } else {
      toast.error('로그인 할 수 없습니다.')
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleNaverLogin}>
      <img src="src/assets/naver_login_btn.png" width="260" height="50" />
    </div>
  );
}

export default NaverLogin;
