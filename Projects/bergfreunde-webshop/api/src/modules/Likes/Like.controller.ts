import { NextFunction, Request, Response } from "express";
import Like from "./Like.model";
import notFoundError from "../../middleware/Error/notFoundError";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";

const getLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const likes = await Like.find({ userId: user._id });
    res.json(likes);
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
};

const createLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // if user already liked the product, return 400 but dont throw error
    const { user } = req as AuthRequest;
    const { productId } = req.body;
    const like = await Like.findOne({ userId: user._id, productId });
    if (like) {
      return res
        .status(400)
        .json({ message: "User already liked this product" });
    }
    const newLike = new Like({
      userId: user._id,
      productId,
    });
    await newLike.save();
    res.json(newLike);
  } catch (err) {
    next(err);
  }
};

const getLikeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const like = await Like.findOne({
      _id: id,
      userId: user._id,
    });
    if (!like) {
      throw new notFoundError("Like not found");
    }
    res.json(like);
  } catch (err) {
    next(err);
  }
};

const updateLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const like = await Like.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!like) {
      throw new notFoundError("Like not found");
    }
    res.json(like);
  } catch (err) {
    next(err);
  }
};

const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const like = await Like.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!like) {
      throw new notFoundError("Like not found");
    }
    res.json({ message: `Like with id:${id} has been deleted` });
  } catch (err) {
    next(err);
  }
};

export { getLikes, createLike, getLikeById, updateLike, deleteLike };
