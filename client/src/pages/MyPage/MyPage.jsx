// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchOrders } from "../../api/client";
// import "./MyPage.css";

// export default function MyPage() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function loadOrders() {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await fetchOrders();
//         setOrders(Array.isArray(data) ? data : []);
//       } catch (err) {
//         setError(err.message || "주문 목록을 불러오지 못했습니다.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadOrders();
//   }, []);

//   const latestOrder = orders[0] ?? null;

//   return (
//     <div className="MyPage">
//       <header className="Header">
//         <div className="page Header_Row">
//           <Link to="/" className="Header_logo" aria-label="5trip 홈">
//             <span className="ohtrip-logo-icon2">
//               <img src="/icon/ohtrip-logo-icon2.png" alt="5TRIP" className="logo_img" />
//             </span>
//           </Link>
//           <button type="button" className="MyPage_Btn" aria-label="마이페이지">
//             <span className="MyPage_Btn_Text">마이페이지</span>
//           </button>
//         </div>
//       </header>

//       <nav className="Nav" aria-label="breadcrumb">
//         <div className="Nav_container">
//           <img src="/icon/Home_icon.png" alt="홈" className="Nav_homeIcon" />
//           <span className="Nav_text">HOME</span>
//           <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
//           <span className="Nav_text active">마이페이지</span>
//         </div>
//       </nav>

//       <main className="MyPage_Main">
//         <section className="Search_Module">
//           <div className="Tabs_Wrapper">
//             <div className="Tabs">
//               <button type="button" className="tab is-active">전체</button>
//               <button type="button" className="tab">결제대기</button>
//               <button type="button" className="tab">신규 예약</button>
//               <button type="button" className="tab">리뷰 작성</button>
//             </div>
//             <div className="divider" />
//           </div>

//           <section className="Order_Product_Section">
//             <h2 className="Section_Title">주문 상품</h2>
//             <div className="Divider" />

//             {loading && (
//               <p style={{ padding: "20px", textAlign: "center" }}>로딩 중...</p>
//             )}
//             {!loading && error && (
//               <p style={{ padding: "20px", color: "#c00", textAlign: "center" }}>{error}</p>
//             )}
//             {!loading && !error && latestOrder && (
//               <div key={latestOrder.id} className="Order_Row_Block">
//                 <article className="My_Product_Row">
//                   <div className="Product_Info">
//                     <img
//                       src={latestOrder.productImageUrl || "/images/Tour_Image.png"}
//                       alt={latestOrder.title}
//                       className="Product_Image"
//                     />
//                     <div className="Product_Text">
//                       <h3 className="My_Product_Title">{latestOrder.title}</h3>
//                       <p className="My_People_Date">{latestOrder.dateText || "날짜 미정"}</p>
//                       <p className="People_Count">{latestOrder.people}명</p>
//                     </div>
//                   </div>
//                   <p className="Product_Price">{Number(latestOrder.totalPrice).toLocaleString()}원</p>
//                 </article>
//                 <div className="Divider" />
//               </div>
//             )}
//             {!loading && !error && !latestOrder && (
//               <p style={{ padding: "20px" }}>예약 내역이 없습니다.</p>
//             )}
//           </section>
//         </section>

//         <div className="Button_Row">
//           <button type="button" className="Btn_Home" onClick={() => navigate("/")}>홈으로 가기</button>
//         </div>
//       </main>
//     </div>
//   );
// }

import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./MyPage.css";

export default function MyPage() {
  const { pathname } = useLocation();
  const tabLabel = pathname.includes("profile") ? "회원정보" : "결제 내역";

  return (
    <div className="MyPage">
      <header className="Header">
        <div className="page Header_Row">
          <Link to="/" className="Header_logo" aria-label="5trip 홈">
            <span className="ohtrip-logo-icon2">
              <img src="/icon/ohtrip-logo-icon2.png" alt="5TRIP" className="logo_img" />
            </span>
          </Link>
          <button type="button" className="MyPage_Btn" aria-label="마이페이지">
            <span className="MyPage_Btn_Text">마이페이지</span>
          </button>
        </div>
      </header>

      <nav className="Nav" aria-label="breadcrumb">
        <div className="Nav_container">
          <img src="/icon/User_02.png" alt="사용자" className="Nav_userIcon" />
          <span className="Nav_text">마이페이지</span>
          <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
          {/* 경로에 따라 동적으로 표시 */}
          <span className={`Nav_text ${!pathname.includes("edit") ? "active" : ""}`}>회원정보</span>
          
          {pathname.includes("edit") && (
            <>
              <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
              <span className="Nav_text active">회원정보 수정</span>
            </>
          )}
          {pathname.includes("withdraw-complete") && (
            <>
              <img src="/icon/arrow_right.png" alt=">" className="Nav_arrowIcon" />
              <span className="Nav_text active">회원탈퇴 완료</span>
            </>
          )}
        </div>
      </nav>

      <main className="MyPage_Main">
        <div className="User_Module">
          <div className="my_Tabs_Wrapper">
            <div className="my_Tabs">
              <NavLink
                to="orders"
                className={({ isActive }) => `tab_pay${isActive ? " is-active" : ""}`}
              >
                <span className="tab_label">결제 내역</span>
                {/* <div className="my_tab_indicator" /> */}
              </NavLink>
              <NavLink
                to="profile"
                className={({ isActive }) => `tab_user${isActive ? " is-active" : ""}`}
              >
                <span className="tab_label">회원정보</span>
                <div className="my_tab_indicator" />
              </NavLink>
            </div>
            <div className="user_divider" />
          </div>

          <div className="Tab_Content">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}