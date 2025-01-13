import { Request, Response, Router } from "express";
import { findProducts } from "controllers/product.controllers";

const router = Router();

router.get("/", findProducts);

// router.get("/:id", (req: Request, res: Response) => {
//   const prod = products.find((p) => p._id === req.params.id);
//   res.json(prod);
// });

export default router;
