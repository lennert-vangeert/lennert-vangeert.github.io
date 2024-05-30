import { NextFunction, Request, Response } from "express";
import noteModel from "./Order.model";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";
import notFoundError from "../../middleware/Error/notFoundError";
import orderModel from "./Order.model";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const order = await orderModel
      .find({
        userId: user._id,
      })
      .sort({ createdOn: -1 })
      .lean();
    if (order.length === 0) {
      throw new notFoundError("No orders found");
    }
    res.json(order);
  } catch (e) {
    next(e);
  }
};

const getOrderDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const order = await orderModel
      .findOne({
        _id: id,
        userId: user._id,
      })
      .lean()
      .populate("trip");

    if (!order) {
      throw new notFoundError("Order not found");
    }
    res.json(order);
  } catch (e) {
    next(e);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const order = new orderModel({
      ...req.body,
      userId: user._id,
    });
    const result = await order.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    // make sure trip exists AND that the trip belongs to the user

    // { new: true } om ge-update versie terug te krijgen
    const order = await noteModel.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!order) {
      throw new notFoundError("Order not found");
    }
    res.json(order);
  } catch (e) {
    next(e);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const order = await orderModel.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!order) {
      throw new notFoundError("Order not found");
    }
    res.json({ message: `Order with id ${id} deleted` });
  } catch (e) {
    next(e);
  }
};

export { getOrders, getOrderDetail, createOrder, updateOrder, deleteOrder};
