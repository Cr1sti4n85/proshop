import {
  IProductRepository,
  IProductService,
  PaginatedProducts,
  Product,
} from "../types/product.types";

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async createProduct(data: Product): Promise<Product> {
    return this.productRepository.create(data);
  }

  async findProducts(
    pageSize: number,
    page: number
  ): Promise<PaginatedProducts> {
    return this.productRepository.findAllPaginated(pageSize, page);
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
