import express, { Application } from "express";
import cors from "cors";
import { EnvConfiguration } from "./config/envConfig";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import { notFound, errorHandler } from "./middleware/error.middleware";
import "./config/db";

const PORT = EnvConfiguration().port;

const app: Application = express();

app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
