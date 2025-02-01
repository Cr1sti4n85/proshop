import { Router } from "express";
import {
  createProduct,
  findProductById,
  findProducts,
} from "controllers/product.controller";
import { protect, admin } from "middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .get(protect, findProducts)
  .post(protect, admin, createProduct);

router.get("/:id", findProductById);

export default router;
