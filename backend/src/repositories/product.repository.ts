import ProductModel from "../models/product.model";
import {
  IProductRepository,
  PaginatedProducts,
  Product,
} from "../types/product.types";

export class ProductRepository implements IProductRepository {
  async create(data: Product): Promise<Product> {
    const newProduct = new ProductModel(data);
    return await newProduct.save();
  }

  async find(): Promise<Product[]> {
    return await ProductModel.find({}).exec();
  }

  async findAllPaginated(
    pageSize: number,
    page: number,
    keyword: string
  ): Promise<PaginatedProducts> {
    if (keyword) {
      const queryObj = { name: { $regex: keyword, $options: "i" } };
      const count = await ProductModel.countDocuments({ ...queryObj });
      const products = await ProductModel.find({ ...queryObj })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .exec();
      return { products, page, pages: Math.ceil(count / pageSize) };
    } else {
      const count = await ProductModel.countDocuments();
      const products = await ProductModel.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .exec();
      return { products, page, pages: Math.ceil(count / pageSize) };
    }
  }

  async findTop(): Promise<Product[]> {
    const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3);
    return products;
  }

  async findById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await ProductModel.findByIdAndDelete(id).exec();

    return deleted !== null;
  }
}
