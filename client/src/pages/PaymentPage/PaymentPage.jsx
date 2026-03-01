import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();

  const handleGoHome = () => navigate("/");
  const handleGoMyPage = () => navigate("/mypage");
  const handlePayment = () =>
    navigate("/complete", {
      state: {
        order: {
          title,
          dateText,
          people: guests,
          unitPrice: pricePerPerson,
          totalPrice,
        },
      },
  });

  const location = useLocation();
  const { guests = 1, pricePerPerson = 0, title = "", dateText = ""} = location.state || {};

  const totalPrice = guests * pricePerPerson;

  return (
    <div className="PaymentPage">
      {/* ================= Header ================= */}
      <header className="Header">
        <div className="Header_inner">
          <div className="ohtrip-logo-icon2" onClick={handleGoHome}>
            <img
              src="/icon/ohtrip-logo-icon2.png"
              alt="OhTrip 로고"
              className="logo_img"
            />
          </div>

          <button className="MyPage_Btn" type="button" onClick={handleGoMyPage}>
            마이페이지
          </button>
        </div>
      </header>

      {/* ================= Nav ================= */}
      <div className="Nav">
        <div className="Nav_container">
          <img src="/icon/Home_icon.png" alt="홈" className="Nav_homeIcon" />
          <span className="Nav_text">HOME</span>

          <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
          <span className="Nav_text">상품 상세</span>

          <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
          <span className="Nav_text active">예약</span>
        </div>
      </div>

      {/* ================= Tour Section ================= */}
      <div className="Pay_Tour_Section">
        <img
          src="/images/Tour_Image.png"
          alt="투어 이미지"
          className="Tour_Image"
        />
        <div className="Tour_Info">
          <div className="Tour_DetailRow">
            <div className="Tour_Title">남산 타워 & 한강 유람선</div>
            <div className="Tour_Price">{pricePerPerson.toLocaleString()}원</div>
          </div>

          <div className="Location_Row">
            {/* 아이콘: 너가 svg로 받았으면 svg 경로로 바꿔 */}
            <img
              src="/icon/Location_Icon.png"
              alt=""
              className="Location_Icon"
            />
            <div className="Location_Text">서울특별시 중구 남산공원길 105</div>
          </div>

          <div className="Meta_Row">
            <div className="Tour_Rating">⭐ 4.9 / 3,200명 예약</div>
            <div className="Tour_Meta">소요시간: 5시간</div>
            <div className="language">한국어, 영어</div>
          </div>
        </div>
      </div>

      {/* ================= TravelerInfo Section ================= */}
      <div className="TravelerInfo_Section">
        <div className="TravelerInfo_Title">여행자 정보 입력</div>
        <div className="Divider" />

        <div className="TravelerInfo_Form">
          {/* 이름 */}
          <div className="FieldRow_Name">
            <div className="Field_FirstName">
              <div className="Label">이름</div>
              <div className="Input_Box">
                <input className="Input_field" placeholder="예 : 김" />
              </div>
            </div>

            <div className="Field_LastName">
              <div className="Label">성</div>
              <div className="Input_Box">
                <input className="Input_field" placeholder="예 : 다은" />
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div className="FieldRow_Contact">
            <div className="Field_Phone">
              <div className="Label">휴대폰 번호</div>

              <div className="Input_Box Input_Phone">
                <button type="button" className="CountryCode">
                  <span className="CountryText">+82</span>
                  <span className="CountryArrow">
                    <span className="Icon_Frame" />
                  </span>
                </button>

                <span className="PhoneDivider" />

                <input className="Input_field" placeholder="010 - xxxx - xxxx" />
              </div>
            </div>

            <div className="Field_Email">
              <div className="Label">이메일</div>
              <div className="Input_Box">
                <input
                  className="Input_field"
                  placeholder="예약 확정 이메일 발송"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Booking People Summary ================= */}
        <div className="Booking_People_Summary">
            <div className="Summary_Title">인원수</div>
            <div className="Divider" />

            <div className="Summary_Row">
              <div className="People_Info">
                <div className="People_Control">
                  <div className="People_Label">인원수</div>
                  <div className="People_Count">총 {guests}명</div>
                </div>
              </div>

              <div className="Price_Info">
                <div className="Unit_Price">{pricePerPerson.toLocaleString()}원</div>
                <div className="Multiply">x {guests}</div>
              </div>
            </div>
          </div>
        </div>  

      {/* ================= Payment Summary Section ================= */}
      <div className="Payment_Summary_Section">
        <div className="Payment_Info">
          <div className="Total_Label">결제 금액</div>

          <div className="Payment">
            <div className="Total_Price">{totalPrice.toLocaleString()}</div>
            <div className="Total_Price_w">원</div>
          </div>
        </div>

        <button className="Btn_Payment" type="button" onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}