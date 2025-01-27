import { Document } from "mongoose";
import { User } from "./user.types";
import { Product } from "./product.types";
import { Query, Repository } from "./repository.types";

export interface OrderItems {
  _id?: string | undefined;
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Product["_id"];
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  updateTime: string;
  emailAddress: string;
}

export interface Order extends Document {
  user: User["_id"];
  orderItems: OrderItems[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}

export type currentOrder = Pick<
  Order,
  | "orderItems"
  | "user"
  | "shippingAddress"
  | "paymentMethod"
  | "itemsPrice"
  | "taxPrice"
  | "shippingPrice"
  | "totalPrice"
>;

export interface IOrderRepository extends Repository<Order> {
  findOwn(query: Query): Promise<Order[]>;
}

export interface IOrderService {
  createOrder(data: currentOrder): Promise<Order>;
  findMyOrders(query: Query): Promise<Order[] | null>;
  findOrders(): Promise<Order[]>;
  findOrderById(id: string): Promise<Order | null>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<boolean>;
}
