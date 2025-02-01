import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.services";
import { IProductRepository, IProductService } from "../types/product.types";
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

// @desc Create a product
// @route POST /api/products
// @access Private/admin
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const createdProduct = await productService.createProduct({
      name: "Sample name",
      price: 0,
      user: req.currentUser._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    res.status(201).json(createdProduct);
  }
);

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/admin
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.findProductById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res.json(updatedProduct);
  }
);
