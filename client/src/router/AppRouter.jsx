import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CompletePage from "../pages/CompletePage/CompletePage";
import MyPage from "../pages/MyPage/MyPage";
import AdminPage from "../pages/AdminPage/AdminPage"; 
import PaymentTable from '../pages/Payment/PaymentTable';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/payment-test" element={<PaymentTable />} />
    </Routes>
  );
}