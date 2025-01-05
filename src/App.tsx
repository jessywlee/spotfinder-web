import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DeleteAccount from "./pages/DeleteAccount";
import NoAccount from "./pages/NoAccount";
import RedirectKakao from "./components/redirects/RedirectKakao";
import RedirectNaver from "./components/redirects/RedirectNaver";
import RedirectApple from "./components/redirects/RedirectApple";

function App() {
  return (
    <>
      <div className="text-center">
        <img
          src="src/assets/spotfinder_logo.png"
          alt="spotfinder_logo"
          className="w-10 h-10 m-auto"
        />
        <div className="text-[#4D63FC] font-semibold text-lg">
          SPOT FINDER 회원 탈퇴
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/no-account" element={<NoAccount />} />
          <Route path="/auth/code/kakao" element={<RedirectKakao />} />
          <Route path="/auth/code/naver" element={<RedirectNaver />} />
          <Route path="/auth/code/apple" element={<RedirectApple />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
