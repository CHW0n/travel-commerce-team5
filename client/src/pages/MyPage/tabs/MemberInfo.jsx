import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyInfo, verifyPassword } from "../../../api/client";
import "./MemberInfo.css";

export default function MemberInfo() {
  const [user, setUser] = useState({
    name: "",
    nickname: "",
    email: ""
  }); 
  const [mode, setMode] = useState("view");
  const [currentPassword, setCurrentPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyInfo()
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleEditModeOpen = () => setMode("verifying");

  const handleVerify = async () => {
    try {
      const res = await verifyPassword(currentPassword);
      if (res.matched) {
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
    setCurrentPassword(e.target.value);
  };

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
          <div className="user_Label_name"><span className="user_Label_text">이름</span></div>
          <div className="user_Field_name"><span className="user_Field_text">{user.name}</span></div>
        </div>
        <div className="user_name">
          <div className="user_Label_user"><span className="user_Label_text">닉네임</span></div>
          <div className="user_Field_user"><span className="user_Field_text">{user.nickname}</span></div>
        </div>
        <div className="user_name">
          <div className="user_Label_email"><span className="user_Label_text">이메일</span></div>
          <div className="user_Field_email"><span className="user_Field_text">{user.email}</span></div>
        </div>
        <div className="user_name">
          <div className="user_Label_pw"><span className="user_Label_text">비밀번호</span></div>
          <div className="user_Field_pw">
            {mode === "view" ? (
              <span className="user_Field_text">{"•".repeat(8)}</span>
            ) : (
              <div className="user_Field_pw_edit">
                <input type="password" className="user_Input_pw" placeholder="비밀번호 입력" value={currentPassword} onChange={handleInputChange} autoFocus />
                <button type="button" className="user_btn_pw" onClick={handleVerify}>확인</button>
              </div>
            )}
          </div>
        </div>
        {pwError && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>비밀번호가 일치하지 않습니다.</p>}
      </div>

      <div className="user_FieldRow_Contact">
        <div className="user_Field_btn_con">
          <div className="user_Field_btn">
            <button type="button" className="user_btn_home" onClick={() => navigate("/")}>홈</button>
            <button type="button" className="user_btn_ch" onClick={handleEditModeOpen}>회원정보 수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}