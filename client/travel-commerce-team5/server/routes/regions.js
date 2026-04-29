import { Router } from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const regions = JSON.parse(readFileSync(join(__dirname, "../data/regions.json"), "utf-8"));

const router = Router();

router.get("/", (req, res) => {
  res.json(regions);
});

export default router;