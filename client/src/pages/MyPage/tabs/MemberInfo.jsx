import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberInfo.css";

const dummyUser = {
  name: "김다은",
  nickname: "마동석",
  email: "daeun@example.com",
  password: "password123",
};


export default function MemberInfo() {
  const [mode, setMode] = useState("view"); // "view" | "verifying"
  const [currentPassword, setCurrentPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const navigate = useNavigate();

  const handleEditModeOpen = () => {
    setMode("verifying");
  };

  const handleVerify = () => {
    // 임시 비밀번호 확인 로직
    if (currentPassword === dummyUser.password) {
      setPwError(false);
      navigate("/mypage/profile/edit"); // 성공 시 이동
    } else {
      setPwError(true);
      setCurrentPassword("");
    }
  };

  // 사용자가 다시 입력하기 시작하면 에러 메시지 숨기기
  const handleInputChange = (e) => {
    if (pwError) setPwError(false); 
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
          <div className="user_Label_name">
            <span className="user_Label_text">이름</span>
          </div>
          <div className="user_Field_name">
            <span className="user_Field_text">{dummyUser.name}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_user">
            <span className="user_Label_text">닉네임</span>
          </div>
          <div className="user_Field_user">
            <span className="user_Field_text">{dummyUser.nickname}</span>
          </div>
        </div>

        <div className="user_name">
          <div className="user_Label_email">
            <span className="user_Label_text">이메일</span>
          </div>
          <div className="user_Field_email">
            <span className="user_Field_text">{dummyUser.email}</span>
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

                {/* pwError가 true일 때만 인라인 메시지 렌더링 */}
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
            {/* <button type="button" className="user_btn_ch">회원정보 수정</button> */}
            <button type="button" className="user_btn_ch" onClick={handleEditModeOpen}>
              회원정보 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
