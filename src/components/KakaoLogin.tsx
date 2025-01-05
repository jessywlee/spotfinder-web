const K_CLIENT_ID = import.meta.env.VITE_K_CLIENT_ID;
const K_REDIRECT_URI = import.meta.env.VITE_K_REDIRECT_URI;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_CLIENT_ID}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

function KakaoLogin() {
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
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
