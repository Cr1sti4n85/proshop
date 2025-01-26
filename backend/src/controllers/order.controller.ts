import { Request, Response } from "express";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.services";
import { IOrderRepository, IOrderService } from "../types/order.types";
import asyncHandler from "../middleware/asyncHandler";

const orderRepository: IOrderRepository = new OrderRepository();
const orderService: IOrderService = new OrderService(orderRepository);

//@desc Create new order
//@route POST /api/orders
//@access Private
export const addOrderItems = asyncHandler(
  async (req: Request, res: Response) => {
    //   const order = await orderService.createOrder(req.body);
    res.send("Add order items");
  }
);

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  res.send("Get my orders");
});

//@desc Get logged in user order by ID
//@route GET /api/orders/myorders/:id
//@access Private
export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("Get order by ID");
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
