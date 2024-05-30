import { NextFunction, Request, Response } from "express";
import Product from "./Product.model";
import notFoundError from "../../middleware/Error/notFoundError";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const { user } = req as AuthRequest;
    const product = new Product({ ...req.body, userId: user._id });
    const result = await product.save();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const trip = await Product.findOne({
      _id: id,
    });
    if (!trip) {
      throw new notFoundError("Product not found");
    }
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    console.log(user);
    const product = await Product.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      throw new notFoundError("Product not found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const product = await Product.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!product) {
      throw new notFoundError("Product not found");
    }
    res.json({ message: `Product with id:${id} has been deleted` });
  } catch (err) {
    next(err);
  }
};

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
