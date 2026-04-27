import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CompletePage from "../pages/CompletePage/CompletePage";
import MyPage from "../pages/MyPage/MyPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentTable from "../pages/Payment/PaymentTable";
import MemberInfo from "../pages/MyPage/tabs/MemberInfo";
import EditPassword from "../pages/MyPage/tabs/EditPassword";
import WithdrawComplete from "../pages/MyPage/tabs/WithdrawComplete";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import SignUpCompletePage from "../pages/SignupCompletePage/SignupCompletePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup/complete" element={<SignUpCompletePage />} />

      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/complete" element={<CompletePage />} />

      <Route path="/admin" element={<AdminPage />} />
      <Route path="/payment-test" element={<PaymentTable />} />

      <Route path="/mypage" element={<MyPage />}>
        {/* /mypage 접속 시 기본적으로 profile로 리다이렉트, 나중에 변경 필요 */}
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile">
          <Route index element={<MemberInfo />} /> {/* /mypage/profile */}
          <Route path="edit" element={<EditPassword />} /> {/* /mypage/profile/edit */}
        </Route>
      </Route>

      <Route
        path="/mypage/profile/withdraw-complete"
        element={<WithdrawComplete />}
      />
    </Routes>
  );
}
