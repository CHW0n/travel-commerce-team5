import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CompletePage from "../pages/CompletePage/CompletePage";
import MyPage from "../pages/MyPage/MyPage";
import MemberInfo from "../pages/MyPage/tabs/MemberInfo";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="/mypage" element={<MyPage />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<MemberInfo />} />
        {/* orders는 나중에 추가 */}
      </Route>
    </Routes>
  );
}