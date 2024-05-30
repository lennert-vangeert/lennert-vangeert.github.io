import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";
import User from "./User.model";

// get all users but omit password and only if user requesting is admin
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;

  res.json({
    token: user.generateToken(),
  });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      res.status(400).json({ message: "user already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        role: req.body.role,
      });
      await newUser.save();
      res.status(200).json({ token: newUser.generateToken() });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const updateUserAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  // TODO - remove password from user object
  res.json(user);
};
export { login, getCurrentUser, register, updateUser, updateUserAsAdmin, getUsers };
