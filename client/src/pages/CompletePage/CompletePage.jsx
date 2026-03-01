import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CompletePage.css";

export default function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ PaymentPage에서 navigate("/complete", { state: {...} })로 넘기면 여기서 받음
  // 아직 안 넘기고 있으니 fallback(임시값)으로 렌더됨
  const order = location.state?.order ?? {
    title: "남산 타워 & 한강 유람선",
    dateText: "2월 20일 (화)",
    people: 2,
    unitPrice: 33280,
    totalPrice: 66269, // 피그마 예시 값(스크린샷)
    // productImageUrl: "", // 나중에 실제 이미지 URL 넣기
  };

  const calcTotal = useMemo(() => {
    // totalPrice가 있으면 우선 사용, 없으면 unitPrice*people
    if (typeof order.totalPrice === "number") return order.totalPrice;
    return (order.unitPrice ?? 0) * (order.people ?? 1);
  }, [order]);

  useEffect(() => {
    // complete 페이지에 도착하면 최신 주문 1건 저장
    localStorage.setItem(
      "latestOrder",
      JSON.stringify({
        ...order,
        totalPrice: calcTotal, // 계산된 총액을 확정해서 저장
      })
    );
  }, [order, calcTotal]);


  const handleGoHome = () => navigate("/");
  const handleGoMyPage = () => navigate("/mypage");

  return (
    <div className="CompletePage">
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
          <img
            src="/icon/Home_icon.png"
            alt="홈"
            className="Nav_homeIcon"
          />

          <span className="Nav_text">HOME</span>

          <img
            src="/icon/arrow_right.png"
            alt=">"
            className="Nav_arrowIcon"
          />

          <span className="Nav_text">상품 상세</span>

          <img
            src="/icon/arrow_right.png"
            alt=">"
            className="Nav_arrowIcon"
          />

          <span className="Nav_text">예약</span>

          <img
            src="/icon/arrow_right.png"
            alt=">"
            className="Nav_arrowIcon"
          />

          <span className="Nav_text active">결제</span>
        </div>
      </div>

      {/* ================= Hero_Section ================= */}
      <div className="Hero_Section">
        <div className="Hero_Image" />
        <div className="Gradient_Overlay" />
        <div className="Hero_Content">
          <div className="check_icon">
            <img
              src="/icon/check_icon.png"   
              alt="체크 아이콘"
              className="check_icon_img"
            />
          </div>

          <div className="Tour_Title main">예약 완료</div>

          <div className="Tour_Title sub">
            투어 신청이 완료 되었습니다.
            <br />
            신청 내역은 마이페이지를 통해 확인하실 수 있습니다.
          </div>
        </div>
      </div>

      {/* ================= Order_Product_Section ================= */}
      <div className="Order_Product_Section">
        <div className="Section_Title">주문 상품</div>
        <div className="Divider" />

        <div className="Product_Row">
          <div className="Product_Info">
            <div className="Product_Image">
              <img
                src="/images/Tour_Image.png"
                alt={order.title}
                className="Product_Image_Img"
              />
            </div>

            <div className="Product_Text">
              <div className="Product_Title">{order.title}</div>
              <div className="Product_Date">
                {String(order.dateText).replace(/\s*\n\s*/g, " ").trim()}
              </div>
              <div className="Product_People">{order.people}명</div>
            </div>
          </div>

          <div className="Product_Price">{calcTotal.toLocaleString()}원</div>
        </div>

        <div className="Divider" />

        <div className="Order_Price_Row">
          <div className="Order_Price_Meta">
            <div className="Order_Unit_Price">{order.unitPrice.toLocaleString()}</div>
            <div className="Order_Multiply">x</div>
            <div className="Order_People_Label">인원수</div>
            <div className="Order_People_Value">{order.people}명</div>
          </div>

          <div className="Order_Total_Price">
            <div className="Order_Total_Label">주문 금액</div>
            <div className="Frame_5921">
              <div className="Order_Total_Value">{calcTotal.toLocaleString()}</div>
              <div className="Order_Total_Won">원</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Buttons ================= */}
      <div className="Btn_Group">
        <button className="Btn_Booking secondary" type="button" onClick={handleGoHome}>
          홈으로 가기
        </button>

        <button className="Btn_Booking primary" type="button" onClick={handleGoMyPage}>
          예약 상세보기
        </button>
      </div>
    </div>
  );
}
