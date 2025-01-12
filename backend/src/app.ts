import express, { Application } from "express";
import { loadEnvFile } from "process";
import products from "./data/products";

loadEnvFile();

const PORT = process.env.PORT || "4000";

const app: Application = express();

app.get("/api/products", (_req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const prod = products.find((p) => p._id === req.params.id);
  res.json(prod);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
