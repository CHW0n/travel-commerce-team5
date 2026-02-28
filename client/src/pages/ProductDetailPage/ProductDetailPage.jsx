import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductDetailPage.css";

const today = new Date();
const days = ["일", "월", "화", "수", "목", "금", "토"];
const dates = Array.from({ length: 6 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i); // 오늘부터 +5일까지
  return date;
});

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const product = {
    title: "남산 타워 & 한강 유람선",
    imagePath: "/public/images/seoul-1.png",
    address: "서울특별시 중구 남산공원길 105",
    satisfaction: 4.8,
    bookings: 3200,
    duration: "5시간",
    languages: ["한국어", "영어"],
    pricePerPerson: 35000,
    itinerary: [
      "남산 케이블카 → N서울타워 전망대 관람",
      "한강 유람선 탑승 및 야경 감상",
      "광장시장 야시장 투어"
    ]
  };

  return (
    <div className="ProductDetailPage">
      {/* ── Header ── */}
      <header>
      </header>

      {/* ── Nav ── */}
      <nav>
        <div className="Nav_container">
          <img src="/public/icon/Home_icon.png" alt="home icon" />
          <span className="Nav_text">Home</span>
          <img src="/public/icon/arrow_right.png" alt="arrow right" />
          <span className="Nav_text">상품 상세</span>
        </div>
      </nav>

      <main>
        {/* Tour_Section */}
        <section className="Tour_Section">
          <img className="Tour_Image" src={product.imagePath} alt={product.title} />

          <div className="Tour_Info">
            {/* 첫 번째 Tour_Info */}
            <div className="Tour_Info_Top">

              <div className="Tour_Detail_Top">
                <h1 className="Tour_Title">{product.title}</h1>
                <div className="Location_Row">
                  <img className="Location_Icon" src="/public/icon/Location_icon.png" alt="location" />
                  <span className="Location_Text">{product.address}</span>
                </div>
              </div>

              <div className="Tour_Price">
                {product.pricePerPerson.toLocaleString()}원
              </div>

            </div>
            {/* 두 번째 Tour_Info */}
            <div className="Tour_Info_Bottom">
              <div className="Tour_Detail_Bottom">
                <div className="Tour_Text">
                  <span className="Tour_Rating">
                   ⭐️ {product.satisfaction} / {product.bookings.toLocaleString()}명 예약
                  </span>
                  <span className="Tour_Meta">소요시간: {product.duration}</span>
                  <span className="language">{product.languages.join(", ")}</span>
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* Tour_Description_Section */}
        <section className="Tour_Description_Section">
          <h2 className="Description_Title">일정</h2>
          <hr className="Divider" />
          <div className="Description_Text">
            {product.itinerary.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </section>
        {/* Tour_Date_Section */}
        <section className="Tour_Date_Section">
          <h2 className="Date_Title">이용 날짜</h2>
          <hr className="Divider" />
          <div className="Date_Card_List">
            {dates.map((date, index) => (
              <div
                key={index}
                className={selectedDate === date ? "Date_Card_Selected" : "Date_Card"}
                onClick={() => setSelectedDate(date)}
              >
                <span>{date.getMonth() + 1}월 {date.getDate()}일 ({days[date.getDay()]})</span>
                <span>{product.pricePerPerson.toLocaleString()}원</span>
              </div>
            ))}
            <div className="Date_All">
              <span>모든 날짜</span>
              <span className="Date_All_Link">보러 가기</span>
            </div>
            </div>
        </section>
        {/* Tour_People_Section */}
        <section className="Tour_People_Section">
          <h2 className="People_Title">인원수</h2>
          <hr className="Divider" />
          <div className="People_Row">

            <div className="People_Control">
              <span className="People_Label">총 인원</span>
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
              <span className="People_Count">{guests}명</span>
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

            <div className="Payment_Info">
              <span className="Payment_Title">결제 금액</span>
              <div className="Payment">
                <span className="Payment_Price">{(product.pricePerPerson * guests).toLocaleString()}</span>
                <span className="Payment_Price_w">원</span>
              </div>
            </div>

            <button className="Btn_Booking" onClick={() => navigate("/payment")}>
              예약하기
            </button>

          </div>
        </section>
      </main>
    </div>
  );
}