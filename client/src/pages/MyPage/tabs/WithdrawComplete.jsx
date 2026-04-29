import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/header";
import "./WithdrawComplete.css";
import "../MyPage.css";

export default function WithdrawComplete() {
  const navigate = useNavigate();

  return (
    <div className="MyPage">
      <Header />

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
        <div className="check_icon_container">
          <img
            src="/icon/check_icon.png"
            alt="complete"
            className="check_icon"
          />
        </div>

        <div className="Withdraw_Title_Box">
          <h2 className="Withdraw_Title">회원탈퇴 완료</h2>
        </div>

        <div className="Withdraw_Divider" />

        <div className="Withdraw_content">
          <p className="Withdraw_text_bold">회원탈퇴가 완료 되었습니다</p>
          <p className="Withdraw_text_regular">
            5Trip을 이용해주셔서 감사합니다
          </p>
        </div>

        <div className="Withdraw_btn_area">
          <button
            type="button"
            className="Withdraw_home_btn"
            onClick={() => navigate("/", { replace: true })}
          >
            홈
          </button>
        </div>
      </div>
    </div>
  );
}
