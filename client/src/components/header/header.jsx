import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
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
          <button type="button" className="Header_LoginButton">
            로그인
          </button>
          <button type="button" className="Header_SignupButton">
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}
