import express from "express";
import { createLike, deleteLike, getLikeById, getLikes, updateLike } from "./Like.controller";

const router = express.Router();

router.get("/likes", getLikes);
router.get("/likes/:id", getLikeById);
router.post("/likes", createLike);
router.patch("/likes/:id", updateLike);
router.delete("/likes/:id", deleteLike);

export default router;
