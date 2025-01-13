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
