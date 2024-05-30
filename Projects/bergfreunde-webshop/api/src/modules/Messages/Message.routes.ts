import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessageDetail,
  getMessages,
  updateMessage,
} from "./Message.controller";

const router: Router = Router();

router.get("/messages", getMessages);
router.get("/messages/:id", getMessageDetail);
router.post("/messages", createMessage);
router.delete("/messages/:id", deleteMessage);
router.patch("/messages/:id", updateMessage);

export default router;
