import "../App.css";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";

type Props = {
  children: ReactNode;
}

function Layout({ children } : Props) {
  return (
    <>
      <div className="text-center">
        <img
          src="/spotfinder_logo.png"
          alt="spotfinder_logo"
          className="w-10 h-10 m-auto"
        />
        <div className="text-[#4D63FC] font-semibold text-lg">
          SPOT FINDER 회원 탈퇴
        </div>
      </div>
      {children}
      <ToastContainer position="bottom-center" theme="colored"/>
    </>
  );
}

export default Layout;
