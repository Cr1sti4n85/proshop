import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.services";
import { IProductRepository, IProductService } from "../types/product.types";
import { EnvConfiguration } from "../config/envConfig";
import asyncHandler from "../middleware/asyncHandler";

const productRepository: IProductRepository = new ProductRepository();
const productService: IProductService = new ProductService(productRepository);

// @desc Fetch all produts
// @route GET /api/products
// @access Public
export const findProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const pageSize = Number(EnvConfiguration().pageSize);
    console.log(pageSize);
    const page = Number(req.query.pageNumber) || 1;
    const keyword =
      typeof req.query.keyword === "string" ? req.query.keyword : "";
    const products = await productService.findProducts(pageSize, page, keyword);

    if (!products) {
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

// @desc Get top rated products
// @route GET /api/products/:id
// @access Public
export const getTopProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await productService.findTopProducts();

    res.status(200).json(products);
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

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/admin
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedProduct = await productService.deleteProduct(req.params.id);

    if (!deletedProduct) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(deletedProduct);
  }
);

// @desc Create a review
// @route POST /api/products/:id/reviews
// @access Private
export const createProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { rating, comment } = req.body;
    const product = await productService.findProductById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const alreadyReview = product.reviews?.find(
      (review) => review?.user.toString() === req.currentUser._id.toString()
    );
    if (alreadyReview) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.currentUser.name,
      rating: Number(rating),
      comment,
      user: req.currentUser._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  }
);
