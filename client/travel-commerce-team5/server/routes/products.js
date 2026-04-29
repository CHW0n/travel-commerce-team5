import { Router } from "express";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRODUCTS_DIR = join(__dirname, "../data/products");
const VALID_REGIONS = ["seoul", "busan", "jeju", "gangneung"];

function normalizeImageUrl(url) {
  if (typeof url !== "string") return url;
  // In HTTPS deployments, HTTP images are blocked as mixed content.
  // Prefer HTTPS when the upstream supports it.
  if (url.startsWith("http://")) return `https://${url.slice("http://".length)}`;
  return url;
}

// ── 초기화: 서버 시작 시 전체 지역 데이터 캐싱 ──
const productsCache = {};
for (const regionId of VALID_REGIONS) {
  const filePath = join(PRODUCTS_DIR, `${regionId}.json`);
  if (existsSync(filePath)) {
    productsCache[regionId] = JSON.parse(readFileSync(filePath, "utf-8")).map((product) => ({
      ...product,
      imagePath: normalizeImageUrl(product.imagePath),
    }));
  }
}

function getProductsByRegion(regionId) {
  return productsCache[regionId] ?? null;
}

function findProductById(productId) {
  const regionId = productId.split("-")[0];
  if (!VALID_REGIONS.includes(regionId)) return null;

  const products = getProductsByRegion(regionId);
  if (!products) return null;

  return products.find((p) => p.id === productId) ?? null;
}

const router = Router();

// ── 상품 목록 조회 (GET /api/products?region=&page=&perPage=) ──
router.get("/", (req, res) => {
  const { region, page = "1", perPage = "16" } = req.query;

  if (!region) {
    return res.status(400).json({ error: "region 파라미터가 필요합니다." });
  }

  if (!VALID_REGIONS.includes(region)) {
    return res.status(400).json({ error: "유효하지 않은 지역입니다." });
  }

  const products = getProductsByRegion(region);
  if (!products) {
    return res.status(404).json({ error: "해당 지역 데이터를 찾을 수 없습니다." });
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const perPageNum = Math.min(100, Math.max(1, parseInt(perPage, 10) || 16));
  const totalCount = products.length;
  const start = (pageNum - 1) * perPageNum;
  const end = start + perPageNum;
  const paginatedProducts = products.slice(start, end);

  res.json({
    products: paginatedProducts,
    totalCount,
  });
});

// ── 상품 상세 조회 (GET /api/products/:productId) ──
router.get("/:productId", (req, res) => {
  const { productId } = req.params;

  const product = findProductById(productId);
  if (!product) {
    return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
  }

  res.json(product);
});

export default router;
