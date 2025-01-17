import { CommonResponse } from "../api/api.ts";
const LOGIN_STATE = "login";
const UNLINK_STATE = "unlink";

const N_CLIENT_ID = import.meta.env.VITE_N_CLIENT_ID;
const N_REDIRECT_URI = import.meta.env.VITE_N_REDIRECT_URI;

const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_CLIENT_ID}&state=${LOGIN_STATE}&redirect_uri=${N_REDIRECT_URI}`;
const naverUnlinkUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${N_CLIENT_ID}&state=${UNLINK_STATE}&redirect_uri=${N_REDIRECT_URI}`;

const K_CLIENT_ID = import.meta.env.VITE_K_CLIENT_ID;
const K_REDIRECT_URI = import.meta.env.VITE_K_REDIRECT_URI;
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${K_CLIENT_ID}&state=${LOGIN_STATE}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
const kakaoUnlinkUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${K_CLIENT_ID}&state=${UNLINK_STATE}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

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
};

export const verifyLoginResponse = (
  response: CommonResponse
) => {
  if (response.data.code === "REQ000") {
    return response.data.code;
  } else {
    return response.data.message;
  }
};

export type LoginResponseCode = "REQ000" | "AUTH004" | "AUTH003" | "MBR000" | "default";
type SocialType = "N" | "A" | "K";

interface ResultAction {
  message: string | null;
  navigateTo: (socialType?: SocialType) => string;
}

const resultActions: Record<LoginResponseCode, ResultAction> = {
  REQ000: {
    message: null,
    navigateTo: (socialType?: SocialType) => `/delete-account?socialType=${socialType}`,
  },
  AUTH004: {
    message: "소셜 서비스의 회원 정보 조회를 실패했습니다.",
    navigateTo: () => "/",
  },
  AUTH003: {
    message: "인증에 실패했습니다. 다시 시도하거나 관리자에게 문의해 주세요.",
    navigateTo: () => "/",
  },
  MBR000: {
    message: null,
    navigateTo: () => "/no-account",
  },
  default: {
    message: "로그인에 실패하였습니다. 다시 시도해 주세요.",
    navigateTo: () => "/",
  },
};

export const getLoginAction = (result: LoginResponseCode): ResultAction  => {
  return resultActions[result] || resultActions.default;
}
