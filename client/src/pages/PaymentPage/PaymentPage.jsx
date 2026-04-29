import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../../api/client";
import { isLoggedIn } from "../../utils/auth";
import "./PaymentPage.css";
import Header from "../../components/header/header";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    productId = "",
    productDateId = null,
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
  const [travelerFirstName, setTravelerFirstName] = useState("");
  const [travelerLastName, setTravelerLastName] = useState("");
  const [travelerPhone, setTravelerPhone] = useState("");
  const [travelerEmail, setTravelerEmail] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login", {
        replace: true,
        state: {
          from: productId ? `/products/${productId}` : "/",
        },
      });
      return;
    }
  
    if (!location.state?.title) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate, productId]);

  const handlePayment = async () => {
    if (!productId || !title || !dateText) {
      setSubmitError("예약 정보가 올바르지 않습니다. 다시 시도해주세요.");
      return;
    }
    if (!travelerFirstName || !travelerLastName || !travelerPhone || !travelerEmail) {
      setSubmitError("예약자 정보를 모두 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createOrder({
        productId,
        productDateId,
        title,
        dateText,
        people: guests,
        unitPrice: pricePerPerson,
        totalPrice,
        travelerFirstName,
        travelerLastName,
        travelerPhone,
        travelerEmail,
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
            travelerFirstName: created.travelerFirstName,
            travelerLastName: created.travelerLastName,
            travelerPhone: created.travelerPhone,
            travelerEmail: created.travelerEmail,
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
      <Header />

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

      <div className="Pay_Tour_Section">
        <img
          className="Tour_Image"
          src={productImageUrl || "/images/Tour_Image.png"}
          alt={title}
        />

        <div className="Tour_Info">
          <div className="Tour_Info_Top">
            <div className="Tour_Detail_Top">
              <h1 className="Detail_Tour_Title">{title}</h1>

              <div className="Detail_Location_Row">
                <img
                  className="Detail_Location_Icon"
                  src="/icon/Location_Icon.png"
                  alt="location"
                />
                <span className="Detail_Location_Text">{address}</span>
              </div>
            </div>

            <div className="Detail_Tour_Price">
              {pricePerPerson.toLocaleString()}원
            </div>
          </div>

          <div className="Tour_Info_Bottom">
            <div className="Tour_Detail_Bottom">
              <div className="Tour_Text">
                <span className="Detail_Tour_Rating">
                  ⭐ {satisfaction} / {Number(bookings).toLocaleString()}명 예약
                </span>
                <span className="Detail_Tour_Meta">소요시간: {duration}</span>
                <span className="Detail_language">
                  {Array.isArray(languages) ? languages.join(", ") : languages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="TravelerInfo_Section">
        <div className="TravelerInfo_Title">여행자 정보 입력</div>
        <div className="Divider" />

        <div className="TravelerInfo_Form">
          <div className="FieldRow_Name">
            <div className="Field_FirstName">
              <div className="Pay_Label">이름</div>
              <div className="Input_Box">
                <input
                  className="Pay_Input_field"
                  placeholder="예 : 김"
                  value={travelerFirstName}
                  onChange={(event) => setTravelerFirstName(event.target.value)}
                />
              </div>
            </div>

            <div className="Field_LastName">
              <div className="Pay_Label">성</div>
              <div className="Input_Box">
                <input
                  className="Pay_Input_field"
                  placeholder="예 : 다은"
                  value={travelerLastName}
                  onChange={(event) => setTravelerLastName(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="Pay_FieldRow_Contact">
            <div className="Field_Phone">
              <div className="Pay_Label">휴대폰 번호</div>

              <div className="Input_Box Input_Phone">
                <button type="button" className="CountryCode">
                  <span className="CountryText">+82</span>
                  <span className="CountryArrow">
                    <span className="Icon_Frame" />
                  </span>
                </button>

                <span className="PhoneDivider" />

                <input
                  className="Pay_Input_field"
                  placeholder="010 - xxxx - xxxx"
                  value={travelerPhone}
                  onChange={(event) => setTravelerPhone(event.target.value)}
                />
              </div>
            </div>

            <div className="Pay_Field_Email">
              <div className="Pay_Label">이메일</div>
              <div className="Input_Box">
                <input
                  className="Pay_Input_field"
                  placeholder="예약 확정 이메일 발송"
                  value={travelerEmail}
                  onChange={(event) => setTravelerEmail(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

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
