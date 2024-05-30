import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderDetail,
  getOrders,
  updateOrder,
} from "./Order.controller";

const router: Router = Router();

router.get("/orders", getOrders);
router.get("/orders/:id", getOrderDetail);
router.post("/orders", createOrder);
router.patch("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

export default router;
