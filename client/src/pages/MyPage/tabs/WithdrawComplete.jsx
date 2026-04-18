import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WithdrawComplete.css";
import "../MyPage.css";

export default function WithdrawComplete() {
  const navigate = useNavigate();

  return (
    <div className="MyPage">
      <header className="Header">
        <div className="page Header_Row">
          <Link to="/" className="Header_logo" aria-label="5trip 홈">
            <span className="ohtrip-logo-icon2">
              <img src="/icon/ohtrip-logo-icon2.png" alt="5TRIP" className="logo_img" />
            </span>
          </Link>
          <button type="button" className="MyPage_Btn" aria-label="마이페이지">
            <span className="MyPage_Btn_Text">마이페이지</span>
          </button>
        </div>
      </header>

      <nav className="Nav" aria-label="breadcrumb">
        <div className="Nav_container">
          <img src="/icon/User_02.png" alt="사용자" className="Nav_userIcon" />
          <span className="Nav_text">마이페이지</span>
          <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
          <span className="Nav_text">회원정보</span>
          <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
          <span className="Nav_text active">회원탈퇴 완료</span>
        </div>
      </nav>

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
    </div>
  );
}
