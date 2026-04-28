import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import "./MemberInfo.css";

export default function MemberInfo() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("view"); // "view" | "verifying"
  const [currentPassword, setCurrentPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const handleEditModeOpen = () => {
    setMode("verifying");
  };

  const handleVerify = async () => {
    try {
      const res = await api.post(
        "/users/verify-password",
        { password: currentPassword }
      );
      if (res.data.matched) {
        setPwError(false);
        navigate("/mypage/profile/edit", { state: { currentPassword } });
      } else {
        setPwError(true);
        setCurrentPassword("");
      }
    } catch (err) {
      console.error("비밀번호 확인 실패", err);
      setPwError(true);
      setCurrentPassword("");
    }
  };

  const handleInputChange = (e) => {
    if (pwError) setPwError(false);
    setCurrentPassword(e.target.value);
  };

  if (!user) return null;

  return (
    <div className="user_content">
      <div className="user_header">
        <div className="user_title">
          <h2 className="user_Title_main">회원정보</h2>
          <p className="user_Title_sub">원하시는 정보를 수정할 수 있습니다.</p>
        </div>
      </div>

      <div className="user_Form">
        <div className="user_name">
          <div className="user_Label_name">
            <span className="user_Label_text">이름</span>
          </div>
          <div className="user_Field_name">
            <span className="user_Field_text">{user.name}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_user">
            <span className="user_Label_text">닉네임</span>
          </div>
          <div className="user_Field_user">
            <span className="user_Field_text">{user.nickname}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_email">
            <span className="user_Label_text">이메일</span>
          </div>
          <div className="user_Field_email">
            <span className="user_Field_text">{user.email}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_pw">
            <span className="user_Label_text">비밀번호</span>
          </div>
          <div className="user_Field_pw">
            {mode === "view" ? (
              <span className="user_Field_text">{"•".repeat(8)}</span>
            ) : (
              <div className="user_Field_pw_edit">
                <input
                  type="password"
                  className="user_Input_pw"
                  placeholder="기존 비밀번호를 입력해주세요"
                  value={currentPassword}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  autoFocus
                />
                <button type="button" className="user_btn_pw" onClick={handleVerify}>
                  <span className="user_pw_c">확인</span>
                </button>

                {pwError && (
                  <div className="user_pw_c_fail">
                    <span className="pw_fail_text">* 비밀번호를 다시 입력해주세요</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="user_FieldRow_Contact">
        <div className="user_Field_btn_con">
          <div className="user_Field_btn">
            <button type="button" className="user_btn_home" onClick={() => navigate("/")}>홈</button>
            <button type="button" className="user_btn_ch" onClick={handleEditModeOpen}>
              회원정보 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
