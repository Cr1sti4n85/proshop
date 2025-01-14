import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.services";
import {
  IProductRepository,
  IProductService,
  Product,
} from "../types/product.types";
import asyncHandler from "../middleware/asyncHandler";

const productRepository: IProductRepository = new ProductRepository();
const productService: IProductService = new ProductService(productRepository);

// @desc Fetch all produts
// @route GET /api/products
// @access Public
export const findProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await productService.findProducts();

    if (!products.length) {
      res.status(404).json({ message: "No products found" });
      return;
    }

    res.status(200).json(products);
  }
);

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const findProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.findProductById(req.params.id);

    if (product) {
      res.status(200).json(product);
      return;
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  }
);
