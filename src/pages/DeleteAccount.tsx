function DeleteAccount() {
  return (
    <>
      <div className="p-4 rounded-md border border-gray-300 text-gray-500 text-sm text-left">
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
        <button className="px-4 py-2 bg-black text-white text-semibold w-full rounded-md mt-4 font-semibold">
          확인
        </button>
      </div>
    </>
  );
}

export default DeleteAccount;
