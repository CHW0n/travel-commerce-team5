import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkEmail, checkNickname, signupUser } from "../../api/client";
import Header from "../../components/header/header";
import "./SignUpPage.css";
import dropdownIcon from "/icon/dropdown_icon.png";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState(null);

  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null);

  const [agreements, setAgreements] = useState({
    service: false,
    finance: false,
    privacy: false,
  });

  const [openTerms, setOpenTerms] = useState({
    service: true,
    finance: false,
    privacy: false,
  });

  const isEmailFormatValid = useMemo(() => {
    if (!email.trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const isPasswordFormatValid = useMemo(() => {
    if (!password.trim()) return true;
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,32}$/.test(password);
  }, [password]);

  const isPasswordCheckValid = useMemo(() => {
    if (!passwordCheck.trim()) return true;
    return password === passwordCheck;
  }, [password, passwordCheck]);

  const isAllAgreed =
    agreements.service && agreements.finance && agreements.privacy;

  async function handleNicknameCheck() {
    const value = nickname.trim();

    if (!value) {
      setNicknameChecked(true);
      setNicknameAvailable(false);
      return;
    }

    try {
      const result = await checkNickname(value);
      setNicknameChecked(true);
      setNicknameAvailable(result.available);
    } catch (error) {
      alert(error.message);
      setNicknameChecked(true);
      setNicknameAvailable(false);
    }
  }

  async function handleEmailCheck() {
    const value = email.trim();

    if (!value || !isEmailFormatValid) {
      setEmailChecked(true);
      setEmailAvailable(false);
      return;
    }

    try {
      const result = await checkEmail(value);
      setEmailChecked(true);
      setEmailAvailable(result.available);
    } catch (error) {
      alert(error.message);
      setEmailChecked(true);
      setEmailAvailable(false);
    }
  }

  function handleToggleAllAgreements() {
    const next = !isAllAgreed;
    setAgreements({
      service: next,
      finance: next,
      privacy: next,
    });
  }

  function handleToggleAgreement(key) {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleToggleOpen(key) {
    setOpenTerms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("이름을 입력해 주세요.");
      return;
    }

    if (!nickname.trim()) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    if (!nicknameChecked || !nicknameAvailable) {
      alert("닉네임 중복 확인을 완료해 주세요.");
      return;
    }

    if (!email.trim()) {
      alert("이메일을 입력해 주세요.");
      return;
    }

    if (!isEmailFormatValid) {
      alert("올바른 이메일 형식을 입력해 주세요.");
      return;
    }

    if (!emailChecked || !emailAvailable) {
      alert("이메일 중복 확인을 완료해 주세요.");
      return;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    if (!isPasswordFormatValid) {
      alert("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    if (!passwordCheck.trim()) {
      alert("비밀번호 확인을 입력해 주세요.");
      return;
    }

    if (!isPasswordCheckValid) {
      alert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!agreements.service || !agreements.finance) {
      alert("필수 약관에 동의해 주세요.");
      return;
    }

    try {
      const user = await signupUser({
        email: email.trim(),
        password,
        name: name.trim(),
        nickname: nickname.trim(),
      });

      navigate("/signup/complete", {
        state: {
          nickname: user.nickname,
        },
      });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="SignUpPage">
      <Header />

      <main className="SignUpPage_Content">
        <div className="SignUpPage_Breadcrumb">회원가입</div>

        <section className="SignUp_Section">
          <div className="SignUp_Title">회원가입</div>
          <div className="SignUp_Divider" />

          <form className="SignUp_Form" onSubmit={handleSubmit}>
            {/* 이름 */}
            <div className="SignUp_FieldRow_name">
              <div className="SignUp_Field_name">
                <label className="SignUp_Label_name" htmlFor="name">
                  이름
                </label>

                <div className="SignUp_Input_name">
                  <div className="SignUp_Input_field">
                    <div className="SignUp_Input_field_inner">
                      <input
                        id="name"
                        className="Field_Input"
                        type="text"
                        placeholder="이름을 입력해 주세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 닉네임 */}
            <div className="SignUp_FieldRow_user">
              <div className="SignUp_Field_user">
                <label className="SignUp_Label_user" htmlFor="nickname">
                  닉네임
                </label>

                <div className="user_cont">
                  <div className="Input_user">
                    <div className="Input_field">
                      <div className="Input_field_inner">
                        <input
                          id="nickname"
                          className="Field_Input"
                          type="text"
                          placeholder="닉네임을 입력해 주세요"
                          value={nickname}
                          onChange={(e) => {
                            setNickname(e.target.value);
                            setNicknameChecked(false);
                            setNicknameAvailable(null);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="user_field"
                    onClick={handleNicknameCheck}
                  >
                    <span className="user_text">중복 확인</span>
                  </button>
                </div>

                {nicknameChecked && nicknameAvailable === false && (
                  <div className="SignUp_user_fail">
                    <p className="user_fail_text">사용 중인 닉네임입니다.</p>
                  </div>
                )}

                {nicknameChecked && nicknameAvailable === true && (
                  <div className="SignUp_user_success">
                    <p className="user_success_text">사용 가능한 닉네임입니다.</p>
                  </div>
                )}
              </div>
            </div>

            {/* 이메일 */}
            <div className="SignUp_FieldRow_email">
              <div className="SignUp_Field_email">
                <label className="SignUp_Label_email" htmlFor="email">
                  이메일
                </label>

                <div className="email_field">
                  <div className="SignUp_Input_email">
                    <div className="Input_field">
                      <div className="Input_field_inner">
                        <input
                          id="email"
                          className="Field_Input"
                          type="email"
                          placeholder="이메일을 입력해 주세요"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailChecked(false);
                            setEmailAvailable(null);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="SignUp_Input_field_button"
                    onClick={handleEmailCheck}
                  >
                    <span className="email_text">이메일 확인</span>
                  </button>
                </div>

                {email.trim() && !isEmailFormatValid && (
                  <div className="SignUp_email_fail">
                    <p className="email_fail_text">
                      이메일 형식이 맞지 않습니다.
                    </p>
                  </div>
                )}

                {emailChecked &&
                  emailAvailable === false &&
                  isEmailFormatValid && (
                    <div className="SignUp_email_fail">
                      <p className="email_fail_text">
                        이미 사용 중인 이메일입니다.
                      </p>
                    </div>
                  )}

                {emailChecked &&
                  emailAvailable === true &&
                  isEmailFormatValid && (
                    <div className="SignUp_email_success">
                      <p className="email_success_text">
                        사용 가능한 이메일입니다.
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="SignUp_FieldRow_pw">
              <div className="SignUp_Field_pw">
                <label className="SignUp_Label_pw" htmlFor="password">
                  비밀번호
                </label>

                <div className="SignUp_Input_pw">
                  <div className="SignUp_Input_field">
                    <div className="SignUp_Input_field_inner">
                      <input
                        id="password"
                        className="Field_Input"
                        type="password"
                        placeholder="특수문자, 숫자가 포함된 8~32자 이내"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {password.trim() && !isPasswordFormatValid && (
                  <div className="SignUp_pw_fail">
                    <p className="pw_fail_text">
                      비밀번호는 특수문자, 숫자가 포함된 8~32자 이내여야
                      합니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div className="SignUp_pw_2">
              <div className="SignUp_Field_pw2">
                <label className="SignUp_Label_pw2" htmlFor="passwordCheck">
                  비밀번호 확인
                </label>

                <div className="SignUp_Input_pw2">
                  <div className="SignUp_Input_field2">
                    <div className="SignUp_Input_field2_inner">
                      <input
                        id="passwordCheck"
                        className="Field_Input"
                        type="password"
                        placeholder="동일한 비밀번호를 입력해 주세요"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {passwordCheck.trim() && !isPasswordCheckValid && (
                  <div className="SignUp_pw_fail2">
                    <p className="pw_fail_text2">
                      동일한 비밀번호를 입력해 주세요
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 약관 */}
            <div className="Required">
              <div className="Required_Field">
                <div className="Required_title">이용약관 동의</div>

                <div className="Required_box">
                  <button
                    type="button"
                    className="Required_all"
                    onClick={handleToggleAllAgreements}
                  >
                    <span
                      className={`check_circle_icon ${
                        isAllAgreed ? "checked" : ""
                      }`}
                    >
                      <img
                        src={dropdownIcon}
                        alt=""
                        className="check_dropdown_img"
                      />
                    </span>
                    <span className="Required_all_text">모두 동의합니다</span>
                  </button>

                  <div className="Required_content">
                    <div className="Required_item">
                      <div className="Required_header">
                        <div className="accordion_header">
                          <button
                            type="button"
                            className="Required_ic_check_off"
                            onClick={() => handleToggleAgreement("service")}
                          >
                            <span
                              className={`check_circle_icon ${
                                agreements.service ? "checked" : ""
                              }`}
                            >
                              <img
                                src={dropdownIcon}
                                alt=""
                                className="check_dropdown_img"
                              />
                            </span>
                          </button>

                          <button
                            type="button"
                            className="dropdown_icon"
                            onClick={() => handleToggleOpen("service")}
                          >
                            [필수] 서비스 이용 약관
                          </button>

                          <button
                            type="button"
                            className={`accordion_arrow ${
                              openTerms.service ? "open" : ""
                            }`}
                            onClick={() => handleToggleOpen("service")}
                          />
                        </div>
                      </div>

                      {openTerms.service && (
                        <div className="Required_item_content">
                          <p>제1조 (목적)</p>
                          <p>
                            본 약관은 [서비스명](이하 "회사")이 제공하는 모바일 및 웹
                            서비스의 이용 조건 및 절차, 이용자와 회사 간의 권리,
                            의무 및 책임 사항을 규정함을 목적으로 합니다.
                          </p>

                          <p>제2조 (용어의 정의)</p>
                          <p>
                            "서비스"라 함은 회사가 운영하는 플랫폼 내에서 제공하는
                            모든 기능을 의미합니다.
                          </p>
                          <p>
                            "이용자"란 본 약관에 동의하고 서비스를 이용하는 회원 및
                            비회원을 말합니다.
                          </p>

                          <p>제3조 (서비스의 제공 및 변경)</p>
                          <p>회사는 이용자에게 다음과 같은 서비스를 제공합니다.</p>
                          <p>
                            [핵심 기능 명시, 예: 실시간 메시징 및 데이터 연동 서비스]
                          </p>
                          <p>
                            기타 회사가 추가로 개발하거나 제휴 계약을 통해 제공하는
                            서비스
                          </p>
                          <p>
                            회사는 서비스의 기술적 사양 변경이 필요한 경우 공지사항을
                            통해 사전에 고지합니다.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="Required_item">
                      <div className="Required_header">
                        <div className="accordion_header">
                          <button
                            type="button"
                            className="Required_ic_check_off"
                            onClick={() => handleToggleAgreement("finance")}
                          >
                            <span
                              className={`check_circle_icon ${
                                agreements.finance ? "checked" : ""
                              }`}
                            >
                              <img
                                src={dropdownIcon}
                                alt=""
                                className="check_dropdown_img"
                              />
                            </span>
                          </button>

                          <button
                            type="button"
                            className="dropdown_icon"
                            onClick={() => handleToggleOpen("finance")}
                          >
                            [필수] 전자금융거래 이용약관
                          </button>

                          <button
                            type="button"
                            className={`accordion_arrow ${
                              openTerms.finance ? "open" : ""
                            }`}
                            onClick={() => handleToggleOpen("finance")}
                          />
                        </div>
                      </div>

                      {openTerms.finance && (
                        <div className="Required_item_content">
                          <p>제1조 (목적)</p>
                          <p>
                            본 약관은 이용자가 회사가 제공하는 전자금융서비스를
                            안전하고 편리하게 이용할 수 있도록 금융거래의 기초가 되는
                            사항을 정함을 목적으로 합니다.
                          </p>

                          <p>제2조 (거래 내용의 확인)</p>
                          <p>
                            회사는 이용자의 관리 화면을 통해 이용자의 거래 내용을
                            확인할 수 있도록 하며, 이용자의 요청이 있을 경우 전자적
                            장치를 통해 즉시 확인 가능하도록 합니다.
                          </p>

                          <p>제3조 (오류의 정정)</p>
                          <p>
                            이용자는 전자금융거래에 오류가 있음을 알았을 때 회사에
                            정정을 요구할 수 있습니다.
                          </p>
                          <p>
                            회사는 오류 정정 요구를 받은 날로부터 2주 이내에 그 결과를
                            이용자에게 알립니다.
                          </p>

                          <p>제4조 (거래 기록의 보존)</p>
                          <p>
                            회사는 전자금융거래법 등 관련 법령에 따라 다음의 기록을
                            5년간 보존합니다.
                          </p>
                          <p>거래의 종류 및 금액, 거래 상대방에 관한 정보</p>
                          <p>전자적 장치의 접속 기록 및 거래 승인 번호</p>
                        </div>
                      )}
                    </div>

                    <div className="Required_item">
                      <div className="Required_header">
                        <div className="accordion_header">
                          <button
                            type="button"
                            className="Required_ic_check_off"
                            onClick={() => handleToggleAgreement("privacy")}
                          >
                            <span
                              className={`check_circle_icon ${
                                agreements.privacy ? "checked" : ""
                              }`}
                            >
                              <img
                                src={dropdownIcon}
                                alt=""
                                className="check_dropdown_img"
                              />
                            </span>
                          </button>

                          <button
                            type="button"
                            className="dropdown_icon"
                            onClick={() => handleToggleOpen("privacy")}
                          >
                            [선택] 개인정보 처리방침
                          </button>

                          <button
                            type="button"
                            className={`accordion_arrow ${
                              openTerms.privacy ? "open" : ""
                            }`}
                            onClick={() => handleToggleOpen("privacy")}
                          />
                        </div>
                      </div>

                      {openTerms.privacy && (
                        <div className="Required_item_content">
                          <p>
                            OH TRIP은 관련 법령에 따라 이용자의 개인정보를 보호하고
                            관련 고충을 신속하게 처리하기 위해 다음과 같은 처리 방침을
                            수립·공개합니다.
                          </p>

                          <p>1. 개인정보의 수집 및 이용 목적</p>
                          <p>
                            회사는 다음의 목적을 위해 개인정보를 수집하며, 목적 외의
                            용도로는 사용하지 않습니다.
                          </p>
                          <p>회원 가입 의사 확인, 본인 식별, 회원 탈퇴 의사 확인</p>
                          <p>서비스 제공에 따른 본인 인증 및 서비스 부정 이용 방지</p>
                          <p>고충 처리 및 상담 응대</p>

                          <p>2. 수집하는 개인정보 항목</p>
                          <p>필수항목: 이메일 주소, 비밀번호, 닉네임, 휴대전화 번호</p>
                          <p>자동수집항목: IP 주소, 쿠키, 서비스 이용 기록, 기기 정보</p>

                          <p>3. 개인정보의 보유 및 이용 기간</p>
                          <p>
                            원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당
                            정보를 지체 없이 파기합니다.
                          </p>
                          <p>
                            단, 관련 법령(상법, 전자상거래법 등)에 따라 보존할 필요가
                            있는 경우 해당 기간 동안 보관합니다.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 가입 버튼 */}
            <div className="FieldRow_Contact">
              <div className="Field_Email">
                <div className="Input_Email">
                  <button type="submit" className="Input_field_submit">
                    <span className="Field_submit_text">회원가입</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="SignUp_To_Login">
            이미 회원이신가요? <Link to="/login">로그인</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
