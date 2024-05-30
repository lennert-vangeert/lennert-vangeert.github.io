import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";
import notFoundError from "../../middleware/Error/notFoundError";
import messageModel from "./Message.model";

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const messages = await messageModel
      .find({
        receiverId: user._id,
      })
      .sort({ createdOn: 1 })
      .lean();
    if (messages.length === 0) {
      throw new notFoundError("No messages found");
    }
    res.json(messages);
  } catch (e) {
    next(e);
  }
};

const getMessageDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const message = await messageModel
      .findOne({
        _id: id,
        userId: user._id,
      })
      .lean();

    if (!message) {
      throw new notFoundError("message not found");
    }
    res.json(message);
  } catch (e) {
    next(e);
  }
};

const updateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    // Extract isRead from the request body
    const { isRead } = req.body;

    // Validate isRead is provided and is a boolean
    if (typeof isRead !== "boolean") {
      return res
        .status(400)
        .json({ error: "Invalid input: only isRead can be updated and it must be a boolean" });
    }

    // Prepare the update object
    const update = { isRead };

    // Find and update the message
    const message = await messageModel.findOneAndUpdate(
      {
        _id: id,
        receiverId: user._id,
      },
      update,
      { new: true, runValidators: true }
    );

    if (!message) {
      throw new notFoundError("Message not found");
    }

    res.json(message);
  } catch (err) {
    next(err);
  }
};

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;

    const message = new messageModel({
      ...req.body,
      senderId: user._id,
    });
    const result = await message.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const message = await messageModel.findOneAndDelete({
      _id: id,
      receiverId: user._id,
    });
    if (!message) {
      throw new notFoundError("message not found");
    }
    res.json({ message: `message with id ${id} deleted` });
  } catch (e) {
    next(e);
  }
};

export {
  getMessages,
  getMessageDetail,
  createMessage,
  deleteMessage,
  updateMessage,
};
