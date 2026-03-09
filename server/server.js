import express from "express";
import cors from "cors";
import regionsRouter from "./routes/regions.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/order.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/regions", regionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

const PORT = 4000;

if (!process.env.VITEST) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;