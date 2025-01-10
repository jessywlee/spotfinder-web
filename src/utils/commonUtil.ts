import {CommonResponse} from "../api/api.ts";
const LOGIN_STATE = "login";
const UNLINK_STATE='unlink';

const N_CLIENT_ID = import.meta.env.VITE_N_CLIENT_ID;
const N_REDIRECT_URI = import.meta.env.VITE_N_REDIRECT_URI;

const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_CLIENT_ID}&state=${LOGIN_STATE}&redirect_uri=${N_REDIRECT_URI}`;
const naverUnlinkUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_CLIENT_ID}&state=${UNLINK_STATE}&redirect_uri=${N_REDIRECT_URI}`;

const K_CLIENT_ID = import.meta.env.VITE_K_CLIENT_ID;
const K_REDIRECT_URI = import.meta.env.VITE_K_REDIRECT_URI;
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${K_CLIENT_ID}&state=${LOGIN_STATE}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
const kakaoUnlinkUrl =  `https://kauth.kakao.com/oauth/authorize?client_id=${K_CLIENT_ID}&state=${UNLINK_STATE}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

export const getAuthUrl = (socialType: "N" | "K") => {
  switch (socialType) {
    case "N":
      return naverLoginUrl;
    case "K":
      return kakaoLoginUrl;
    default:
      throw new Error("Invalid socialType provided");
  }
};

export const getUnlinkAuthUrl = (socialType: "N" | "K") => {
  switch (socialType) {
    case "N":
      return naverUnlinkUrl;
    case "K":
      return kakaoUnlinkUrl;
    default:
      throw new Error("Invalid socialType provided");
  }
}

export const verifyLoginResponse = (
  response: CommonResponse,
  navigate: (path: string) => void,
socialType: "N" | "K" | 'A'
) => {
  if (response.data.code === "REQ000") {
    navigate("/delete-account?socialType=" + socialType);
  } else {
    return response.data.message
  }
  // } else if (response.data.message === "AUTH004") {
  //   // toast.error("소셜 서비스의 회원 정보 조회를 실패했습니다.");
  //   // navigate("/no-account");
  //   return response.data.message
  //
  // } else if (response.data.message === "AUTH003") {
  //   // toast.error("인증에 실패했습니다. 다시 시도하거나 관리자에게 문의해 주세요.");
  //
  //   navigate("/");
  //   return response.data.message
  // } else {
  //   toast.error(
  //     "로그인에 실패하였습니다. 다시 시도하거나 관리자에게 문의해 주세요."
  //   );
  // }
};
