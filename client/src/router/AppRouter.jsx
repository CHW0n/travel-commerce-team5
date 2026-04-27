import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CompletePage from "../pages/CompletePage/CompletePage";
import MyPage from "../pages/MyPage/MyPage";
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
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}