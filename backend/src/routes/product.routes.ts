import { Router } from "express";
import {
  createProduct,
  findProductById,
  findProducts,
  updateProduct,
} from "controllers/product.controller";
import { protect, admin } from "middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .get(protect, findProducts)
  .post(protect, admin, createProduct);

router.route("/:id").get(findProductById).put(protect, admin, updateProduct);

export default router;
