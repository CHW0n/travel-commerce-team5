import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate(from, { replace: true });
  }

  return (
    <div className="LoginPage">
      <Header />

      <main className="LoginPage_Content">
        <section className="Login_Section">
          <div className="Login_Title">로그인</div>
          <div className="Login_Divider" />

          <form className="Login_Form" onSubmit={handleSubmit}>
            <div className="Login_FieldRow_email">
              <div className="Login_Field_email">
                <label className="Label_email" htmlFor="email">
                  이메일
                </label>

                <div className="Input_email">
                  <div className="Input_field">
                    <input
                      id="email"
                      className="Field"
                      type="email"
                      placeholder="이메일을 입력해 주세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="Login_FieldRow_pw">
              <div className="Login_Field_pw">
                <label className="Label_pw" htmlFor="password">
                  비밀번호
                </label>

                <div className="Input_pw">
                  <div className="Input_field Input_field_pw">
                    <input
                      id="password"
                      className="Field"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해 주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="Password_Toggle_Btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                        >
                        {showPassword ? "숨기기" : "보기"}
                        </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="Login_FieldRow_Contact">
              <button type="submit" className="Login_btn">
                <div className="Login_btn_ct">
                  <div className="Login_btn_box">
                    <span className="Login_btn_text">로그인</span>
                  </div>
                </div>
              </button>
            </div>
          </form>

          <div className="Login_to_SignUp">
            <div className="Login_to_SignUp_text">
              아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}