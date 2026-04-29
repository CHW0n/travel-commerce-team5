import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("Orders API", () => {
  test("GET /api/orders returns order list", async () => {
    const res = await request(app).get("/api/orders");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/orders creates a new order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({
        productId: "product-1",
        title: "남산 타워 & 한강 유람선",
        dateText: "3월 10일",
        people: 2,
        unitPrice: 30000,
        totalPrice: 60000,
        productImageUrl: "/images/test.png",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.productId).toBe("product-1");
    expect(res.body.people).toBe(2);
    expect(res.body.totalPrice).toBe(60000);
  });

  test("POST /api/orders returns 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/orders").send({});

    expect(res.statusCode).toBe(400);
  });
});