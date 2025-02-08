import path from "path";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { EnvConfiguration } from "./config/envConfig";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import orderRoutes from "./routes/order.routes";
import uploadRoutes from "./routes/upload.routes";
import { notFound, errorHandler } from "./middleware/error.middleware";
import "./config/db";

const PORT = EnvConfiguration().port;

const app: Application = express();

app.use(
  cors({
    // origin: "http://localhost:5173",
    credentials: true, // Permitir cookies en solicitudes cross-origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (_req: Request, res: Response) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  return;
});

//Set __dirname to current directory
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
