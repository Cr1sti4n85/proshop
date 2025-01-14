import { Request, Response, Router } from "express";
import { findProductById, findProducts } from "controllers/product.controllers";

const router = Router();

router.get("/", findProducts);

router.get("/:id", findProductById);

export default router;
