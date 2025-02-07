import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProducts,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "controllers/product.controller";
import { protect, admin } from "middleware/auth.middleware";

const router = Router();

router.route("/").get(findProducts).post(protect, admin, createProduct);

router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(findProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
