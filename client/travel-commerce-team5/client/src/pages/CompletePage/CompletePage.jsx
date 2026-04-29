import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CompletePage.css";
import Header from "../../components/header/header";

export default function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // PaymentPage에서 navigate("/complete", { state: { order } })로 넘긴 주문 정보
  const order = location.state?.order ?? null;

  useEffect(() => {
    if (!order) navigate("/", { replace: true });
  }, [order, navigate]);

  const calcTotal = useMemo(() => {
    // totalPrice가 있으면 우선 사용, 없으면 unitPrice*people
    if (!order) return 0;
    if (typeof order.totalPrice === "number") return order.totalPrice;
    return (order.unitPrice ?? 0) * (order.people ?? 1);
  }, [order]);

  useEffect(() => {
    // complete 페이지에 도착하면 최신 주문 1건 저장
    if (!order) return;
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

  if (!order) return null;

  return (
    <div className="CompletePage">
      {/* ================= Header ================= */}
      <Header />

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
        <div
          className="Hero_Image"
          style={{
            backgroundImage: `url(${order?.productImageUrl || "/images/Tour_Image.png"})`,
          }}
        />
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
                src={order.productImageUrl || "/images/Tour_Image.png"}
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
