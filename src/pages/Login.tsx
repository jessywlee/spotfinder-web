import KakaoLogin from "../components/KakaoLogin";
// import NaverLogin from "../components/NaverLogin";
import AppleLogin from "../components/AppleLogin";
import Layout from "../components/Layout.tsx";

function Login() {
  return (
    <>
      <Layout>
        <div>
          <div className="flex flex-col gap-2 mt-8 relative">
            {/*<NaverLogin />*/}
            <KakaoLogin />
            <AppleLogin />
          </div>

          <div className="text-gray-500 text-xs mt-8">
            회원 탈퇴에 관한 문의사항은 아래 메일로 문의해주세요. <br />
            j.manager.365@gmail.com
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
