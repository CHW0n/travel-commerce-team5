import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyPage.css";

export default function MyPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("latestOrder");
    if (saved) setOrder(JSON.parse(saved));
  }, []);

  return (
    <div className="MyPage">
      <header className="My_Header">
        <div className="page Header_Row">
          <Link to="/" className="Header_logo" aria-label="5trip 홈">
            <span className="ohtrip-logo-icon2">
              <img
                src="/icon/ohtrip-logo-icon2.png"
                alt="5TRIP"
                className="logo_img"
              />
            </span>
          </Link>
          <button type="button" className="MyPage_Btn">
            <span className="MyPage_Btn_Text">마이페이지</span>
          </button>
        </div>
      </header>

      <nav className="Nav" aria-label="breadcrumb">
        <div className="Nav_container">
          <img src="/icon/Home_icon.png" alt="" className="Home_icon" />
          <div className="Breadcrumb_Text">
            <span className="Nav_text">HOME</span>
            <span className="Icon_Frame">›</span>
            <strong className="Nav_text_Active">마이페이지</strong>
          </div>
        </div>
      </nav>

      <main className="MyPage_Main">
        <section className="Search_Module">
          <div className="Tabs_Wrapper">
            <div className="Tabs">
              <button type="button" className="tab is-active">
                전체
              </button>
              <button type="button" className="tab">
                결제대기
              </button>
              <button type="button" className="tab">
                신규 예약
              </button>
              <button type="button" className="tab">
                리뷰 작성
              </button>
            </div>
            <div className="divider" />
          </div>

          <section className="Order_Product_Section">
            <h2 className="Section_Title">주문 상품</h2>
            <div className="Divider" />

            {order ? (
              <article className="My_Product_Row">
                <div className="Product_Info">
                  <img
                    src="/images/Tour_Image.png"
                    alt={order.title}
                    className="Product_Image"
                  />
                  <div className="Product_Text">
                    <h3 className="My_Product_Title">{order.title}</h3>
                    <p className="My_People_Date">{order.dateText}</p>
                    <p className="People_Count">{order.people}명</p>
                  </div>
                </div>
                <p className="Product_Price">
                  {order.totalPrice.toLocaleString()}원
                </p>
              </article>
            ) : (
              <p style={{ padding: "20px" }}>예약 내역이 없습니다.</p>
            )}

            <div className="Divider" />
          </section>
        </section>

        <div className="Button_Row">
          <button
            type="button"
            className="Btn_Home"
            onClick={() => navigate("/")}
          >
            홈으로 가기
          </button>
          <button
            type="button"
            className="Btn_Booking"
            onClick={() => navigate("/complete")}
          >
            예약 상세보기
          </button>
        </div>
      </main>
    </div>
  );
}