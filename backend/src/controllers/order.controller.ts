import { Request, Response } from "express";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.services";
import {
  currentOrder,
  IOrderRepository,
  IOrderService,
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
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
      // _id: undefined,
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
    const order = await orderService.findOrderById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.update_time,
      emailAddress: req.body.payer.email_address,
    };

    const updatedOrder = await orderService.updateOrder(req.params.id, order);

    res.status(200).json(updatedOrder);
  }
);

//@desc Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
export const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await orderService.findOrderById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isDelivered = true;
    order.deliveredAt = new Date(Date.now());

    const updatedOrder = await orderService.updateOrder(req.params.id, order);

    res.status(200).json(updatedOrder);
  }
);

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
export const getAllOrders = asyncHandler(
  async (_req: Request, res: Response) => {
    const orders = await orderService.findOrders();
    res.status(200).json(orders);
  }
);
