import { Link } from "react-router-dom";

function NoAccount() {
  return (
    <>
      <div className="p-4 text-md">
        회원가입 되지 않은 회원입니다.
        <br />
        선택한 소셜로그인이 회원가입 시 사용된 것이 맞는지 다시 확인해 주세요.
      </div>
      <div className="mt-4 w-full">
        <button className="px-4 py-2 bg-black text-white text-semibold w-full rounded-md mt-4 font-semibold">
          <Link to="/">다시 로그인하러 가기</Link>
        </button>
      </div>
    </>
  );
}

export default NoAccount;
