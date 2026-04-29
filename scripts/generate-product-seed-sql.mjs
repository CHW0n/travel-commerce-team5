import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const regionsPath = path.join(repoRoot, "server/data/regions.json");
const productsDir = path.join(repoRoot, "server/data/products");
const outputPath = path.join(repoRoot, "backend/src/main/resources/sql/local-product-seed.sql");

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function sqlString(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

function sqlNumber(value) {
  return Number.isFinite(value) ? String(value) : "NULL";
}

function sqlJson(value) {
  return sqlString(JSON.stringify(value ?? []));
}

function normalizeImageUrl(url) {
  if (typeof url !== "string") return url;
  if (url.startsWith("http://")) {
    return `https://${url.slice("http://".length)}`;
  }
  return url;
}

const regions = readJson(regionsPath);
const regionIdMap = new Map(regions.map((region, index) => [region.id, index + 1]));

const productFiles = regions.map((region) => `${region.id}.json`);

const productRows = [];
let productId = 1;

for (const fileName of productFiles) {
  const regionKey = fileName.replace(/\.json$/, "");
  const products = readJson(path.join(productsDir, fileName));

  for (const product of products) {
    productRows.push({
      productId,
      externalProductId: product.id,
      regionId: regionIdMap.get(regionKey),
      title: product.title,
      imageUrl: normalizeImageUrl(product.imagePath),
      address: product.address,
      satisfaction: product.satisfaction,
      reviewCount: product.reviewCount,
      bookings: product.bookings,
      duration: product.duration,
      pricePerPerson: product.pricePerPerson,
      languages: product.languages,
      itinerary: product.itinerary,
      status: "ACTIVE",
    });

    productId += 1;
  }
}

const regionValues = regions
  .map(
    (region, index) =>
      `  (${index + 1}, ${sqlString(region.name)}, ${index + 1}, 'ACTIVE')`,
  )
  .join(",\n");

const productValues = productRows
  .map(
    (product) => `  (
    ${product.productId},
    ${sqlString(product.externalProductId)},
    ${product.regionId},
    ${sqlString(product.title)},
    ${sqlString(product.imageUrl)},
    ${sqlString(product.address)},
    ${sqlNumber(product.satisfaction)},
    ${sqlNumber(product.reviewCount)},
    ${sqlNumber(product.bookings)},
    ${sqlString(product.duration)},
    ${sqlNumber(product.pricePerPerson)},
    ${sqlJson(product.languages)},
    ${sqlJson(product.itinerary)},
    'ACTIVE',
    NOW(),
    NOW()
  )`,
  )
  .join(",\n");

const productDateValues = [];
let productDateId = 1;

for (const product of productRows) {
  for (let offset = 1; offset <= 12; offset += 1) {
    productDateValues.push(
      `  (${productDateId}, ${product.productId}, DATE_ADD(CURDATE(), INTERVAL ${offset} DAY), 'OPEN', NOW(), NOW())`,
    );
    productDateId += 1;
  }
}

const sql = `-- Generated from server/data/products/*.json
-- Command:
-- node scripts/generate-product-seed-sql.mjs
-- Purpose:
-- bootstrap regions/products/product_dates for a fresh MySQL deployment.

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM product_dates;
DELETE FROM products;
DELETE FROM regions WHERE region_id IN (${regions.map((_, index) => index + 1).join(", ")});

INSERT INTO regions (region_id, region_name, display_order, status) VALUES
${regionValues}
ON DUPLICATE KEY UPDATE
  region_name = VALUES(region_name),
  display_order = VALUES(display_order),
  status = VALUES(status);

INSERT INTO products (
  product_id,
  external_product_id,
  region_id,
  title,
  image_url,
  address,
  satisfaction,
  review_count,
  bookings,
  duration,
  price_per_person,
  languages,
  itinerary,
  status,
  created_at,
  updated_at
) VALUES
${productValues}
ON DUPLICATE KEY UPDATE
  external_product_id = VALUES(external_product_id),
  region_id = VALUES(region_id),
  title = VALUES(title),
  image_url = VALUES(image_url),
  address = VALUES(address),
  satisfaction = VALUES(satisfaction),
  review_count = VALUES(review_count),
  bookings = VALUES(bookings),
  duration = VALUES(duration),
  price_per_person = VALUES(price_per_person),
  languages = VALUES(languages),
  itinerary = VALUES(itinerary),
  status = VALUES(status),
  updated_at = VALUES(updated_at);

INSERT INTO product_dates (
  product_date_id,
  product_id,
  available_date,
  status,
  created_at,
  updated_at
) VALUES
${productDateValues.join(",\n")}
ON DUPLICATE KEY UPDATE
  product_id = VALUES(product_id),
  available_date = VALUES(available_date),
  status = VALUES(status),
  updated_at = VALUES(updated_at);

SET FOREIGN_KEY_CHECKS = 1;
`;

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, sql, "utf8");

console.log(`Generated ${productRows.length} products and ${productDateValues.length} product_dates.`);
console.log(outputPath);
