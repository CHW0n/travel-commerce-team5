import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CompletePage from "../pages/CompletePage/CompletePage";

describe("Payment Flow Pages", () => {
  test("상품상세 페이지 렌더링 테스트", () => {
    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /예약하기/i })).toBeInTheDocument();
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
      <MemoryRouter>
        <CompletePage />
      </MemoryRouter>
    );

    expect(screen.getByText("예약 완료")).toBeInTheDocument();
  });
});