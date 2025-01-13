import ProductModel from "../models/product.model";
import { IProductRepository, Product } from "../types/product.types";

export class ProductRepository implements IProductRepository {
  async create(data: Product): Promise<Product> {
    const newProduct = new ProductModel(data);
    return await newProduct.save();
  }

  async find(): Promise<Product[]> {
    return await ProductModel.find().populate("roles").exec(); //con exec retorna solo los datos
  }

  async findById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id).populate("roles").exec();
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true })
      .populate("roles")
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await ProductModel.findByIdAndDelete(id).exec();

    return deleted !== null;
  }
}
