import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CompletePage from "../pages/CompletePage/CompletePage";

import { fetchProductDetail } from "../api/client";

vi.mock("../api/client", () => ({
  fetchProductDetail: vi.fn(),
}));

describe("Payment Flow Pages", () => {
  test("상품상세 페이지 렌더링 테스트", () => {
    fetchProductDetail.mockResolvedValue({
      id: "1",
      title: "테스트 상품",
      imagePath: "/images/test.png",
      address: "서울",
      pricePerPerson: 10000,
      satisfaction: 4.8,
      bookings: 120,
      duration: "2시간",
      languages: ["한국어"],
      itinerary: ["일정1", "일정2"],
    });

    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route path="/products/:productId" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    return screen.findByRole("button", { name: /예약하기/i });
  });

  test("결제 페이지 렌더링 테스트", () => {
    render(
      <MemoryRouter>
        <PaymentPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /결제하기/i })).toBeInTheDocument();
  });

  test("결제 완료 페이지 렌더링 테스트", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/complete",
            state: {
              order: {
                id: "o1",
                createdAt: "2026-03-11",
                title: "테스트 상품",
                dateText: "3월 11일 (수)",
                people: 2,
                unitPrice: 10000,
                totalPrice: 20000,
                productImageUrl: "/images/test.png",
              },
            },
          },
        ]}
      >
        <Routes>
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("예약 완료")).toBeInTheDocument();
  });
});
