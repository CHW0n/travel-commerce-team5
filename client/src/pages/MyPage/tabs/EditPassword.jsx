import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberInfo.css";

const dummyUser = {
  name: "김다은",
  nickname: "마동석",
  email: "daeun@example.com",
};

export default function EditPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [pwError, setPwError] = useState(false);
  const navigate = useNavigate();
  
  // 1. 새 비밀번호 형식 에러 (pwValidError)
  const [pwValidError, setPwValidError] = useState(false);
  // 2. 비밀번호 불일치 에러 (pwMatchError)
  const [pwMatchError, setPwMatchError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    // 숫자와 특수문자를 포함한 8~32자 정규식
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
    
    // 첫 번째 검사: 형식 체크
    if (!passwordRegex.test(newPassword)) {
      setPwValidError(true);
      setPwMatchError(false);
      return;
    }
  
    // 두 번째 검사: 일치 체크
    if (newPassword !== confirmPassword) {
      setPwValidError(false);
      setPwMatchError(true);
      return;
    }
  
    // 통과 시 로직
    navigate("/mypage/profile");
  };

  return (
    <div className="user_content">
      <div className="user_header">
        <div className="user_title">
          <h2 className="user_Title_main">회원정보 수정</h2>
          <p className="user_Title_sub">새로운 비밀번호를 설정해 주세요.</p>
        </div>
      </div>

      <div className="user_Form">
        {/* 1. 이름 (조회 모드와 동일하게 유지) */}
        <div className="user_name">
          <div className="user_Label_name">
            <span className="user_Label_text">이름</span>
          </div>
          <div className="user_Field_name">
            <span className="user_Field_text">{dummyUser.name}</span>
          </div>
        </div>

        {/* 2. 닉네임 (조회 모드와 동일하게 유지) */}
        <div className="user_name">
          <div className="user_Label_user">
            <span className="user_Label_text">닉네임</span>
          </div>
          <div className="user_Field_user">
            <span className="user_Field_text">{dummyUser.nickname}</span>
          </div>
        </div>

        {/* 3. 이메일 (조회 모드와 동일하게 유지) */}
        <div className="user_name">
          <div className="user_Label_email">
            <span className="user_Label_text">이메일</span>
          </div>
          <div className="user_Field_email">
            <span className="user_Field_text">{dummyUser.email}</span>
          </div>
        </div>

        {/* 4. 새 비밀번호 (기존 '비밀번호' 자리에 들어감) */}
        <div className="user_name">
          <div className="user_Label_pw">
            <span className="user_Label_text">새 비밀번호</span>
          </div>
          <div className="user_Field_pw">
            <div className="user_Field_pw_edit">
              <input 
                type="password" 
                className="user_Input_pw" 
                placeholder="특수문자, 숫자가 포함된 8~32자 이내"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (pwValidError) setPwValidError(false);
                }}
              />
              {/* 형식 에러: user_pw_fail */}
              {pwValidError && (
                <div className="user_pw_fail">
                  <span className="pw_fail_text">* 비밀번호는 특수문자, 숫자가 포함된 8~32자 이내여야 합니다.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5. 비밀번호 확인 (새로 추가되는 행) */}
        <div className="user_name">
          <div className="user_Label_pw">
            <span className="user_Label_text">비밀번호 확인</span>
          </div>
          <div className="user_Field_pw">
            <div className="user_Field_pw_edit">
              <input 
                type="password" 
                className="user_Input_pw" 
                placeholder="동일한 비밀번호를 입력해주세요"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (pwMatchError) setPwMatchError(false);
                }}
              />
              {/* 불일치 에러: user_pw_fail2 (177px) */}
              {pwMatchError && (
                <div className="user_pw_fail2">
                  <span className="pw_fail_text2">* 동일한 비밀번호를 입력해 주세요</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="Withdraw_container">
        <button type="button" className="Withdraw_btn" onClick={() => setIsModalOpen(true)}>회원탈퇴</button>
      </div>

      {/* 하단 버튼 */}
      <div className="user_FieldRow_Contact">
        <div className="user_Field_btn_con">
          <div className="user_Field_btn">
            <button type="button" className="user_btn_home" onClick={() => navigate("/mypage/profile")}>
              취소
            </button>
            <button type="button" className="user_btn_ch" onClick={handleSave}>
              수정완료
            </button>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="Modal_Overlay">
          <div className="User_Modal_Log">
            {/* 1. 상단 닫기 (오른쪽 정렬) */}
            <div className="User_Modal_dialog">
              <button className="close_btn" onClick={() => setIsModalOpen(false)}>
                <img src="/icon/Vector.png" alt="close" className="close_icon" />
              </button>
            </div>

            {/* 2. 헤더 영역 (제목 + 설명 모두 왼쪽 정렬) */}
            <div className="User_Modal_header">
              <div className="User_Modal_title">
                <h3 className="Desc_text_title">정말 탈퇴하시겠어요?</h3>
              </div>
              <div className="User_Modal_des">
                <p className="Desc_text_content">
                  탈퇴하시면 예약 내역, 적립 포인트, 쿠폰 등 모든 혜택이 즉시 삭제되며 복구가 불가능합니다.<br />
                  진행 중인 예약이 있다면 탈퇴 전 취소 처리 후 탈퇴를 진행해 주세요.
                </p>
              </div>
            </div>

            {/* 3. 버튼 영역 (오른쪽 정렬) */}
            <div className="User_Modal_btn">
              <button className="Modal_user_btn_ext" onClick={() => setIsModalOpen(false)}>
                <span className="btn_text_cancel">취소</span>
              </button>
              <button className="Modal_user_btn_filled" onClick={() => navigate("/mypage/profile/withdraw-complete")}>
                <span className="btn_text_confirm">탈퇴</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}