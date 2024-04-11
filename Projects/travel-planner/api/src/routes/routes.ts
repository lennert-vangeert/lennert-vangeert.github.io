import { Express, Router } from "express";
import tripRoutes from "../modules/Trips/Trip.routes";
import noteRoutes from "../modules/Notes/Note.routes";
import expenseRoutes from "../modules/Expenses/Expense.routes";
import activityRoutes from "../modules/Activities/Activity.routes";
import userPublicRoutes from "../modules/Users/User.public.routes";
import userPrivateRoutes from "../modules/Users/User.private.routes";
import { errorHandler } from "../middleware/Error/errorHandlerMiddleware";
import { authJwt } from "../middleware/Auth/authMiddleware";

const registerRoutes = (app: Express) => {
  app.use("/", userPublicRoutes);

  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", tripRoutes);
  authRoutes.use("/", noteRoutes);
  authRoutes.use("/", expenseRoutes);
  authRoutes.use("/", activityRoutes);

  app.use(authJwt, authRoutes);

  //AFTER ALL ROUTES
  app.use(errorHandler);
};

export { registerRoutes };
