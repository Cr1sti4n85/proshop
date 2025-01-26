import { Query } from "types/repository.types";
import { IOrderRepository, IOrderService, Order } from "../types/order.types";

export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(data: Order): Promise<Order> {
    return this.orderRepository.create(data);
  }

  async findMyOrders(query: Query): Promise<Order[] | null> {
    return this.orderRepository.findOwn(query);
  }

  async findOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<Order | null> {
    return this.orderRepository.update(id, order);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orderRepository.delete(id);
  }
}
