import { Express, NextFunction, Request, Response, Router } from "express";
import userPublicRoutes from "../modules/Users/User.public.routes";
import userPrivateRoutes from "../modules/Users/User.private.routes";
import { errorHandler } from "../middleware/Error/errorHandlerMiddleware";
import { authJwt } from "../middleware/Auth/authMiddleware";
import productPublicRoutes from "../modules/Products/Products.public.routes";
import productPrivateRoutes from "../modules/Products/Products.private.routes";
import messageRoutes from "../modules/Messages/Message.routes";
import orderRoutes from "../modules/Orders/Order.routes";
import likeRoutes from "../modules/Likes/Like.routes";
import { Error } from "mongoose";

const registerRoutes = (app: Express) => {
  // Public routes
  app.use("/", userPublicRoutes);
  app.use("/", productPublicRoutes);

  // Authenticated routes
  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", productPrivateRoutes);
  authRoutes.use("/", messageRoutes);
  authRoutes.use("/", orderRoutes);
  authRoutes.use("/", likeRoutes);

  app.use(authJwt, authRoutes);

  // Error handler middleware
  app.use(errorHandler);
};

export { registerRoutes };
