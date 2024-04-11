import { Router } from "express";
import { getCurrentUser, updateUser } from "./User.controller";

const router = Router();
router.get("/users/current", getCurrentUser);
router.patch("/users/edit", updateUser);

export default router;