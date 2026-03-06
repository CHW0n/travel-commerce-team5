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

        <Link to="/mypage" className="MyPage_Btn" aria-label="마이페이지로 이동">
          <span className="MyPage_Btn_Text">마이페이지</span>
        </Link>
      </div>
    </header>
  );
}