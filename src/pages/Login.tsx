function Login() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-8">
        <button className="py-2 px-4 rounded-md border border-gray-300 flex gap-2 items-center">
          <img
            src="src/assets/naver_logo.png"
            alt="naver_logo"
            className="w-8 h-8"
          />
          Naver 계정으로 로그인
        </button>
        <button className="py-2 px-4 rounded-md border border-gray-300 flex gap-2 items-center">
          <img
            src="src/assets/kakao_logo.png"
            alt="kakao_logo"
            className="w-8 h-8"
          />
          Kakao 계정으로 로그인
        </button>
        <button className="py-2 px-4 rounded-md border border-gray-300 flex gap-2 items-center">
          <img
            src="src/assets/apple_logo.png"
            alt="apple_logo"
            className="w-8 h-8"
          />
          Apple 계정으로 로그인
        </button>
      </div>

      <div className="text-gray-500 text-xs mt-8">
        회원 탈퇴에 관한 문의사항은 아래 메일로 문의해주세요. <br />
        j.manager.365@gmail.com
      </div>
    </div>
  );
}

export default Login;
