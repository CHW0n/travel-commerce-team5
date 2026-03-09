import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetail } from "../../api/client";
import Header from "../../components/header/header";
import "./ProductDetailPage.css";

const today = new Date();
const days = ["일", "월", "화", "수", "목", "금", "토"];
const dates = Array.from({ length: 10 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  return date;
});

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [guests, setGuests] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 7;
  const visibleDates = dates.slice(startIndex, startIndex + visibleCount);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleCount < dates.length;

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setError("상품 ID가 없습니다.");
      return;
    }

    setLoading(true);
    setError(null);
    fetchProductDetail(productId)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <div className="ProductDetailPage">
      {/* ── Header ── */}
      <Header />

      {/* ── Nav ── */}
      <nav className="Detail_Nav">
        <div className="Detail_Nav_container">
          <img className="home_icon" src="/public/icon/Home_icon.png" alt="home icon" />
          <span className="Detail_Nav_text">HOME</span>
          <img className="arrow_icon" src="/public/icon/arrow_right.png" alt="arrow right" />
          <span className="Detail_Nav_text">상품 상세</span>
        </div>
      </nav>

      {loading && (
        <main style={{ padding: "40px", textAlign: "center" }}>
          로딩 중...
        </main>
      )}
      {error && (
        <main style={{ padding: "40px", textAlign: "center", color: "#999" }}>
          {error}
        </main>
      )}
      {!loading && !error && product && (
      <main>
        {/* 상세 전용 투어 섹션 (메인 .Tour_Section과 구분) */}
        <section className="Detail_Tour_Section">
          <img className="Detail_Tour_Image" src={product.imagePath} alt={product.title} />

          <div className="Detail_Tour_Info">
            {/* 첫 번째 Tour_Info */}
            <div className="Tour_Info_Top">

              <div className="Tour_Detail_Top">
                <h1 className="Detail_Tour_Title">{product.title}</h1>
                <div className="Detail_Location_Row">
                  <img className="Detail_Location_Icon" src="/public/icon/Location_icon.png" alt="location" />
                  <span className="Detail_Location_Text">{product.address}</span>
                </div>
              </div>

              <div className="Detail_Tour_Price">
                {product.pricePerPerson.toLocaleString()}원
              </div>

            </div>
            {/* 두 번째 Tour_Info */}
            <div className="Tour_Info_Bottom">
              <div className="Tour_Detail_Bottom">
                <div className="Tour_Text">
                  <span className="Detail_Tour_Rating">
                   ⭐️ {product.satisfaction} / {product.bookings.toLocaleString()}명 예약
                  </span>
                  <span className="Detail_Tour_Meta">소요시간: {product.duration}</span>
                  <span className="Detail_language">{product.languages.join(", ")}</span>
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* Tour_Description_Section */}
        <section className="Tour_Description_Section">
          <h2 className="Description_Title">일정</h2>
          <hr className="Detail_Divider" />
          <div className="Description_Text">
            {product.itinerary.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </section>
        {/* Tour_Date_Section */}
        <section className="Tour_Date_Section">
          <h2 className="Date_Title">이용 날짜</h2>
          <hr className="Detail_Divider" />
          <div className="Date_Card_List">
            {/* <button
              className="Date_Nav_Btn"
              onClick={() => setStartIndex(startIndex - 1)}
              disabled={!canGoPrev}
            >
              <img src="/public/icon/back_ic.svg" alt="이전" />
            </button> */}
            <button
              className="Date_Nav_Btn"
              onClick={() => setStartIndex(startIndex - 1)}
              disabled={!canGoPrev}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15.5" fill={canGoPrev ? "#3DB1FD" : "white"} stroke={canGoPrev ? "#3DB1FD" : "#D2D2D2"} filter="url(#shadow)"/>
                <path 
                  d="M17.6569 10.5L12 16.1569L17.6569 21.8137" 
                  stroke={canGoPrev ? "white" : "#D2D2D2"}
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1"/>
                  </filter>
                </defs>
              </svg>
            </button>


            {visibleDates.map((date, index) => (
              <div
                key={startIndex + index}
                className={selectedDate === dates[startIndex + index] ? "Date_Card_Selected" : "Date_Card"}
                onClick={() => {setSelectedDate(dates[startIndex + index]); setDateError("");}}
              >
                <span>{date.getMonth() + 1}월 {date.getDate()}일 ({days[date.getDay()]})</span>
                <span>{product.pricePerPerson.toLocaleString()}원</span>
              </div>
            ))}

            {/* <button
              className="Date_Nav_Btn"
              onClick={() => setStartIndex(startIndex + 1)}
              disabled={!canGoNext}
            >
              <img src="/public/icon/next_ic.svg" alt="다음" />
            </button> */}
            <button
              className="Date_Nav_Btn"
              onClick={() => setStartIndex(startIndex + 1)}
              disabled={!canGoNext}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15.5" transform="matrix(-1 0 0 1 32 0)" fill={canGoNext ? "#3DB1FD" : "white"} stroke={canGoNext ? "#3DB1FD" : "#D2D2D2"} filter="url(#shadow)"/>
                <path 
                  d="M14.3431 10.5L20 16.1569L14.3431 21.8137" 
                  stroke={canGoNext ? "white" : "#D2D2D2"}
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1"/>
                  </filter>
                </defs>
              </svg>
            </button>
          </div>

          {dateError && (
              <p style={{ marginTop: "12px", color: "#d32f2f", fontSize: "14px" }}>
                {dateError}
              </p>
            )}
        </section>
        {/* Tour_People_Section */}
        <section className="Tour_People_Section">
          <h2 className="People_Title">인원수</h2>
          <hr className="Detail_Divider" />
          <div className="People_Row">

            <div className="Detail_People_Control">
              <span className="Detail_People_Label">총 인원</span>
              <button
                className="Btn_Minus"
                onClick={() => setGuests(guests - 1)}
                disabled={guests === 1}
              >
                {/* <img src="/public/icon/Btn_minus.png" alt="minus" /> */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_138_1962)">
                    <path 
                      d="M10 16H22" 
                      stroke={guests === 1 ? "#9E9E9E" : "#222222"}
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_138_1962">
                      <rect width="32" height="32" rx="6" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <span className="Detail_People_Count">{guests}명</span>
              <button
                className="Btn_Plus"
                onClick={() => setGuests(guests + 1)}
              >
                <img src="/public/icon/Btn_plus.png" alt="plus" />
              </button>
            </div>

            <div className="People_Price">
              {(product.pricePerPerson * guests).toLocaleString()}원
            </div>

          </div>
        </section>
        {/* Tour_Payment_Section */}
        <section className="Tour_Payment_Section">
          <div className="Tour_Payment_Row">

            <div className="Detail_Payment_Info">
              <span className="Payment_Title">결제 금액</span>
              <div className="Detail_Payment">
                <span className="Payment_Price">{(product.pricePerPerson * guests).toLocaleString()}</span>
                <span className="Payment_Price_w">원</span>
              </div>
            </div>

            <button
              className="Detail_Btn_Booking"
              onClick={() => {
                if (!selectedDate) {
                  setDateError("이용 날짜를 선택해주세요.");
                  return;
                }

                const dateText = selectedDate
                  ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 (${days[selectedDate.getDay()]})`
                  : "";

                navigate("/payment", {
                  state: {
                    productId: product.id ?? productId,
                    title: product.title,
                    dateText,
                    guests,
                    pricePerPerson: product.pricePerPerson,
                    totalPrice: product.pricePerPerson * guests,
                    productImageUrl: product.imagePath,
                  },
                });
              }}
            >
              예약하기
            </button>

          </div>
        </section>
      </main>
      )}
    </div>
  );
}