import { Router } from "express";
import { getCurrentUser, getUsers, updateUser, updateUserAsAdmin } from "./User.controller";

const router = Router();
router.get("/users", getUsers);
router.get("/users/current", getCurrentUser);
router.patch("/users/edit", updateUser);
router.patch("/users/edit/:id", updateUserAsAdmin);

export default router;