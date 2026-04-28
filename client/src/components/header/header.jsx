import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/client";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const nickname = localStorage.getItem("nickname") || "회원";

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const isSignupCompletePage = location.pathname === "/signup/complete";

  function handleLogout() {
    logoutUser().finally(() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("nickname");
      navigate("/");
    });
  }

  return (
    <header className="Header">
      <div className="page Header_Row">
        <Link to="/" className="Header_logo" aria-label="5trip 홈">
          <span className="ohtrip-logo-icon2">
            <img
              src="/icon/ohtrip-logo-icon2.png"
              alt="5TRIP"
              className="logo_img"
            />
          </span>
        </Link>

        <div className="Frame_56" aria-label="사용자 메뉴">
          {isSignupCompletePage ? (
            <button
              type="button"
              className="Header_SignupButton"
              onClick={() => navigate("/mypage")}
            >
              마이페이지
            </button>
          ) : isAuthPage ? (
            <button
              type="button"
              className="Header_SignupButton"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          ) : isLoggedIn ? (
            <>
              <span className="Header_WelcomeText">
                {nickname}님 반갑습니다
              </span>

              <button
                type="button"
                className="Header_SignupButton"
                onClick={handleLogout}
              >
                로그아웃
              </button>

              <button
                type="button"
                className="Header_SignupButton"
                onClick={() => navigate("/mypage")}
              >
                마이페이지
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="Header_LoginButton"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>

              <button
                type="button"
                className="Header_SignupButton"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}