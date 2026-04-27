import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import "./SignUpCompletePage.css";

export default function SignUpCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

   const nickname = location.state?.nickname || "회원";

  return (
    <div className="SignUpCompletePage">
      <Header />

      <main className="SignUpCompletePage_Content">
        <div className="SignUpCompletePage_Breadcrumb">
          <span>회원가입</span>
          <span className="Breadcrumb_Arrow">›</span>
          <strong>회원가입 완료</strong>
        </div>

        <section className="SignUpComplete_Section">
          <div className="Complete_Icon">
            <img
                src="/icon/check_icon.png"
                alt=""
                className="Complete_Check_Img"
            />
          </div>

          <h1 className="Complete_Title">회원가입 완료</h1>

          <div className="Complete_Divider" />

          <p className="Complete_Text">
            {nickname}님의 회원가입이
            <br />
            성공적으로 완료되었습니다
          </p>

          <button
            type="button"
            className="Complete_Login_Button"
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
        </section>
      </main>
    </div>
  );
}