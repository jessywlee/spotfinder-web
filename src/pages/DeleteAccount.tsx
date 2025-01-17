import Layout from "../components/Layout.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUnlinkAuthUrl } from "../utils/commonUtil.ts";
import React, {useEffect, useState} from "react";
import useUnlink from "../api/hooks/useUnlink.ts";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import DeleteSuccessModal from "../components/DeleteSuccessModal.tsx";

function DeleteAccount() {
  const [searchParams] = useSearchParams();
  const { mutateAsync: fetchUnlink } = useUnlink();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);

  const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const socialType = searchParams.get("socialType");

    if (socialType === "A") {
      const CLEINT_ID = import.meta.env.VITE_A_CLIENT_ID;
      const REDIRECT_URI = import.meta.env.VITE_A_REDIRECT_URI;
      window.AppleID.auth.init({
        clientId: CLEINT_ID,
        scope: "name email",
        redirectURI: REDIRECT_URI,
        state: "unlink",
        nonce: "[NONCE]",
        usePopup: true,
      });
      void handleAuthApple();
    } else if (socialType) {
      const url = getUnlinkAuthUrl(socialType as "N" | "K");
      window.location.href = url;
    }
  };

  const handleAuthApple = async () => {
    try {
      setLoading(true);
      const res = await window.AppleID.auth.signIn();
      const code = res.authorization.code;

      if (code) {
        const response = await fetchUnlink({ authCode: code });
        if (response.data.code === "REQ000") {
          setIsAccountDeleted(true)
        } else {
          toast.error(
            "회원 탈퇴에 실패하였습니다. 다시 시도하거나 관리자에게 문의해 주세요."
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === 'true') {
      setIsAccountDeleted(true)
    }
  }, [searchParams])
  return (
    <Layout>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <FadeLoader
            loading={loading}
            color="#4D63FC"
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={0.5}
          />
        </div>
      )}
      <div className="mt-4 p-4 rounded-md border border-gray-300 text-gray-500 text-sm text-left">
        법령의 규정에 의하여 보존할 필요성이 있는 경우
        <ul>
          <li>-거래 기록 및 증거서류 보관: 5년</li>
          <li>-계약 또는 청약철회 등에 관한 기록: 5년</li>
          <li>-대금 결제 및 재화 등의 공급에 관한 기록: 5년</li>
          <li>-소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
          <li>-신용 정보의 수집, 처리 및 이용 등에 관한 기록: 3년</li>
          <li>-접속에 관한 기록 보존: 3개월 </li>
          <li>
            기타 관련 법령에 따라 개인정보를 일정 기간 동안 전부 또는 일부
            보유할 수 있습니다.
          </li>
        </ul>
      </div>
      <div className="mt-4">
        회원 탈퇴를 하시겠습니까?
        <button
          className="px-4 py-2 bg-black text-white text-semibold w-full rounded-md mt-4 font-semibold"
          onClick={(e) => handleDeleteAccount(e)}
        >
          확인
        </button>
      </div>

      <DeleteSuccessModal isOpen={isAccountDeleted} onClose={() => {navigate('/')}} />
    </Layout>
  );
}

export default DeleteAccount;
