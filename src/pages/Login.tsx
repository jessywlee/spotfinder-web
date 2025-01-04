import { useEffect } from "react";
import KakaoLogin from "../components/KakaoLogin";
import NaverLogin from "../components/NaverLogin";

function Login() {
  useEffect(() => {
    if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: "com.your.app", // Your Service ID from Apple Developer Console
        scope: "name email", // Permissions you need
        redirectURI: "https://your-app.com/callback", // Your redirect URI
        state: "random_state_string", // CSRF protection
        usePopup: true, // Use popup for login
      });
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 mt-8">
        <NaverLogin />

        <KakaoLogin />
        <div
          id="appleid-signin"
          className="w-[260px] h-[64px] cursor-pointer text-lg"
          data-color="black"
          data-border="true"
          data-type="sign-in"
        ></div>
      </div>

      <div className="text-gray-500 text-xs mt-8">
        회원 탈퇴에 관한 문의사항은 아래 메일로 문의해주세요. <br />
        j.manager.365@gmail.com
      </div>
    </div>
  );
}

export default Login;
