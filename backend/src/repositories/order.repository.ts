import { Query } from "types/repository.types";
import OrderModel from "../models/order.model";
import { IOrderRepository, Order } from "../types/order.types";

export class OrderRepository implements IOrderRepository {
  async create(data: Order): Promise<Order> {
    const newOrder = new OrderModel(data);
    return await newOrder.save();
  }

  async find(): Promise<Order[]> {
    return await OrderModel.find().populate("user", "id name").exec();
  }

  async findOwn(query: Query): Promise<Order[]> {
    return await OrderModel.find(query).exec();
  }

  async findById(id: string): Promise<Order | null> {
    return await OrderModel.findById(id).populate("user", "name email").exec();
  }

  async update(id: string, data: Partial<Order>): Promise<Order | null> {
    return await OrderModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await OrderModel.findByIdAndDelete(id).exec();

    return deleted !== null;
  }
}
