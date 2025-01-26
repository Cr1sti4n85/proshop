import { Request, Response } from "express";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.services";
import {
  currentOrder,
  IOrderRepository,
  IOrderService,
  Order,
} from "../types/order.types";
import asyncHandler from "../middleware/asyncHandler";

const orderRepository: IOrderRepository = new OrderRepository();
const orderService: IOrderService = new OrderService(orderRepository);

//@desc Create new order
//@route POST /api/orders
//@access Private
export const addOrderItems = asyncHandler(
  async (req: Request, res: Response) => {
    let {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }: currentOrder = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    orderItems = orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    }));

    const newOrder = await orderService.createOrder({
      orderItems,
      user: req.currentUser._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(newOrder);
  }
);

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderService.findMyOrders({ user: req.currentUser._id });

  res.status(200).json(orders);
});

//@desc Get logged in user order by ID
//@route GET /api/orders/myorders/:id
//@access Private
export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await orderService.findOrderById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.status(200).json(order);
  }
);

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
export const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("Update order to paid");
  }
);

//@desc Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
export const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("Update order to delivered");
  }
);

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("Get all orders");
  }
);
