import React from "react";
import { useNavigate } from "react-router-dom";
import "./WithdrawComplete.css"; 

export default function WithdrawComplete() {
  const navigate = useNavigate();

  return (
    <div className="Withdraw_Section">
      {/* 1. 체크 아이콘 */}
      <div className="check_icon_container">
        <img src="/public/icon/check_icon.png" alt="complete" className="check_icon" />
      </div>

      {/* 2. 타이틀 */}
      <div className="Withdraw_Title_Box">
        <h2 className="Withdraw_Title">회원탈퇴 완료</h2>
      </div>

      {/* 3. 구분선 */}
      <div className="Withdraw_Divider"></div>

      {/* 4. 설명 콘텐츠 */}
      <div className="Withdraw_content">
        <p className="Withdraw_text_bold">회원탈퇴가 완료 되었습니다</p>
        <p className="Withdraw_text_regular">5Trip을 이용해주셔서 감사합니다</p>
      </div>

      {/* 5. 버튼 영역 */}
      <div className="Withdraw_btn_area">
        <button 
          className="Withdraw_home_btn" 
          onClick={() => navigate("/")}
        >
          홈
        </button>
      </div>
    </div>
  );
}