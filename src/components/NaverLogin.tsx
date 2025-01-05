const N_CLIENT_ID = import.meta.env.VITE_N_CLIENT_ID;
const N_REDIRECT_URI = import.meta.env.VITE_N_REDIRECT_URI;
const STATE = "false";
const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_CLIENT_ID}&state=${STATE}&redirect_uri=${N_REDIRECT_URI}`;

function NaverLogin() {
  const handleNaverLogin = () => {
    window.location.href = naverUrl;
  };

  return (
    <div className="cursor-pointer" onClick={handleNaverLogin}>
      <img src="src/assets/naver_login_btn.png" width="260" height="50" />
    </div>
  );
}

export default NaverLogin;
