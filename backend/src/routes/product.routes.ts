import { Router } from "express";
import { findProductById, findProducts } from "controllers/product.controller";

const router = Router();

router.get("/", findProducts);

router.get("/:id", findProductById);

export default router;
