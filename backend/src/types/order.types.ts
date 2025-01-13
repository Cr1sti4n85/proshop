import { Document } from "mongoose";
import { User } from "./user.types";
import { Product } from "./product.types";

export interface OrderItems {
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
}

export interface Order extends Document {
  user: User["_id"];
  orderItems: OrderItems[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}
