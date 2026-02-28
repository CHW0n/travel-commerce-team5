import { Link } from "react-router-dom";
import "./MyPage.css";

export default function MyPage() {
  return (
    <div className="MyPage">
      <header className="Header">
        <div className="page Header_Row">
          <Link to="/" className="Header_logo" aria-label="5trip 홈">
            <span className="ohtrip-logo-icon2">
              <img src="/icon/ohtrip-logo-icon2.png" alt="5TRIP" className="logo_img" />
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
            <article className="Product_Row">
              <div className="Product_Info">
                <img src="/images/Rectangle 150353.png" alt="경복궁" className="Product_Image" />
                <div className="Product_Text">
                  <h3 className="Product_Title">경복궁</h3>
                  <p className="People_Count">2월 20일 (화)</p>
                  <p className="People_Count">2명</p>
                </div>
              </div>
              <p className="Product_Price">66,269원</p>
            </article>
            <div className="Divider" />
          </section>
        </section>

        <div className="Button_Row">
          <button type="button" className="Btn_Home">
            홈으로 가기
          </button>
          <button type="button" className="Btn_Booking">
            예약 상세보기
          </button>
        </div>
      </main>
    </div>
  );
}
