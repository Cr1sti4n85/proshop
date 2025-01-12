import express, { Application } from "express";
import { EnvConfiguration } from "./config/envConfig";
import products from "@data/products";

const PORT = EnvConfiguration().port;

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
