import { Router } from "express";
import {
  createProduct,
  deleteProduct,
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

router
  .route("/:id")
  .get(findProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
