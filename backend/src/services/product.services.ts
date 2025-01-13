import { User } from "types/user.types";
import {
  IProductRepository,
  IProductService,
  Product,
} from "../types/product.types";

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async createProduct(data: Product): Promise<Product> {
    return this.productRepository.create(data);
  }

  async findProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async updateProduct(
    id: string,
    product: Partial<Product>
  ): Promise<Product | null> {
    return this.productRepository.update(id, product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.productRepository.delete(id);
  }
}
