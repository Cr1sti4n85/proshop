//user type: mongoose.Schea.Types.ObjectId,name, image, brand, category, description, reviews [reviewSchema]
//rating, numReviews, price, countInStock
import { Document } from "mongoose";
import { User } from "./user.types";
import { currentReview } from "./review.types";
import { Repository } from "./repository.types";

export interface Product extends Document {
  user: User["_id"];
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  reviews: currentReview[];
  numReviews: number;
  price: number;
  countInStock: number;
}

export type newProduct = Pick<
  Product,
  | "name"
  | "price"
  | "user"
  | "image"
  | "brand"
  | "category"
  | "countInStock"
  | "numReviews"
  | "description"
>;

export interface PaginatedProducts {
  products: Product[];
  page: number;
  pages: number;
}

export interface IProductRepository extends Repository<Product> {
  findAllPaginated(
    pageSize: number,
    page: number,
    keyword: string
  ): Promise<PaginatedProducts>;
}

export interface IProductService {
  createProduct(data: newProduct): Promise<Product>;
  findProducts(
    pageSize: number,
    page: number,
    keyword: string
  ): Promise<PaginatedProducts>;
  findProductById(id: string): Promise<Product | null>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
}
