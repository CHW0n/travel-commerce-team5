import { Router } from "express";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ORDERS_FILE_PATH = join(__dirname, "../data/orders.json");

function readOrders() {
  if (!existsSync(ORDERS_FILE_PATH)) return [];

  try {
    const raw = readFileSync(ORDERS_FILE_PATH, "utf-8").trim();
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  writeFileSync(ORDERS_FILE_PATH, `${JSON.stringify(orders, null, 2)}\n`, "utf-8");
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function normalizeImageUrl(url) {
  if (typeof url !== "string") return url;
  if (url.startsWith("http://")) return `https://${url.slice("http://".length)}`;
  return url;
}

router.get("/", (req, res) => {
  const orders = readOrders().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  res.json(orders);
});

router.post("/", (req, res) => {
  const { productId, title, dateText, people, unitPrice, totalPrice, productImageUrl } = req.body ?? {};

  if (
    !isNonEmptyString(productId) ||
    !isNonEmptyString(title) ||
    !isNonEmptyString(dateText) ||
    !isPositiveNumber(people) ||
    !Number.isInteger(people) ||
    !isPositiveNumber(unitPrice) ||
    !isPositiveNumber(totalPrice)
  ) {
    return res.status(400).json({
      error: "productId, title, dateText, people, unitPrice, totalPrice are required.",
    });
  }

  if (productImageUrl !== undefined && !isNonEmptyString(productImageUrl)) {
    return res.status(400).json({ error: "productImageUrl must be a non-empty string." });
  }

  const created = {
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString(),
    productId: productId.trim(),
    title: title.trim(),
    dateText: dateText.trim(),
    people,
    unitPrice,
    totalPrice,
    ...(productImageUrl
      ? { productImageUrl: normalizeImageUrl(productImageUrl.trim()) }
      : {}),
  };

  const orders = readOrders();
  orders.unshift(created);
  writeOrders(orders);

  return res.status(201).json(created);
});

export default router;
