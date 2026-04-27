import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CompletePage from "../pages/CompletePage/CompletePage";
import MyPage from "../pages/MyPage/MyPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentList from '../pages/MyPage/tabs/PaymentList';
import MemberInfo from "../pages/MyPage/tabs/MemberInfo";
import EditPassword from "../pages/MyPage/tabs/EditPassword";
import WithdrawComplete from "../pages/MyPage/tabs/WithdrawComplete";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/mypage" element={<MyPage />}>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<PaymentList />} />  {/* /mypage/orders */}
        <Route path="profile">
          <Route index element={<MemberInfo />} />       {/* /mypage/profile */}
          <Route path="edit" element={<EditPassword />} />  {/* /mypage/profile/edit */}
        </Route>
      </Route>
      <Route path="/mypage/profile/withdraw-complete" element={<WithdrawComplete />} />
    </Routes>
  );
}