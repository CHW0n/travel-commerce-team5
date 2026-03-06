import express from "express";
import cors from "cors";
import regionsRouter from "./routes/regions.js";
import productsRouter from "./routes/products.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/regions", regionsRouter);
app.use("/api/products", productsRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));