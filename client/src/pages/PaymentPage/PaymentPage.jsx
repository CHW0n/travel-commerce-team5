import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../../api/client";
import "./PaymentPage.css";
import Header from "../../components/header/header";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    productId = "",
    title = "",
    dateText = "",
    guests = 1,
    pricePerPerson = 0,
    totalPrice: stateTotalPrice,
    productImageUrl = "",
    address = "",
    satisfaction = "",
    bookings = 0,
    duration = "",
    languages = [],
  } = location.state || {};

  const totalPrice = stateTotalPrice ?? guests * pricePerPerson;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (!location.state?.title) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  const handlePayment = async () => {
    if (!productId || !title || !dateText) {
      setSubmitError("예약 정보가 올바르지 않습니다. 다시 시도해주세요.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createOrder({
        productId,
        title,
        dateText,
        people: guests,
        unitPrice: pricePerPerson,
        totalPrice,
        ...(productImageUrl ? { productImageUrl } : {}),
      });
      navigate("/complete", {
        state: {
          order: {
            id: created.id,
            createdAt: created.createdAt,
            title: created.title,
            dateText: created.dateText,
            people: created.people,
            unitPrice: created.unitPrice,
            totalPrice: created.totalPrice,
            productImageUrl: created.productImageUrl,
          },
        },
      });
    } catch (err) {
      setSubmitError(err.message || "주문 저장에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="PaymentPage">
      {/* ================= Header ================= */}
      <Header />

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
          src={productImageUrl || "/images/Tour_Image.png"}
          alt={title}
          className="Tour_Image"
        />
        <div className="Tour_Info">
          <div className="Tour_DetailRow">
            <div className="Tour_Title">{title}</div>
            <div className="Tour_Price">{pricePerPerson.toLocaleString()}원</div>
          </div>

          <div className="Location_Row">
            {/* 아이콘: 너가 svg로 받았으면 svg 경로로 바꿔 */}
            <img
              src="/icon/Location_Icon.png"
              alt=""
              className="Location_Icon"
            />
            <div className="Location_Text">{address}</div>
          </div>

          <div className="Meta_Row">
            <div className="Tour_Rating">
              ⭐ {satisfaction} / {Number(bookings).toLocaleString()}명 예약
            </div>
            <div className="Tour_Meta">소요시간: {duration}</div>
            <div className="language">
              {Array.isArray(languages) ? languages.join(", ") : languages}
            </div>
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

        {submitError && (
          <p style={{ color: "#c00", marginBottom: 8, fontSize: "14px" }}>
            {submitError}
          </p>
        )}
        <button
          className="Btn_Payment"
          type="button"
          onClick={handlePayment}
          disabled={isSubmitting}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}