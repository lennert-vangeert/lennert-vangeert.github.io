import { NextFunction, Request, Response } from "express";
import noteModel from "./Note.model";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";
import notFoundError from "../../middleware/Error/notFoundError";
import Tripmodel from "../Trips/Trip.model";

const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { tripId } = req.query;

    const note = await noteModel
      .find({
        userId: user._id,
        ...(tripId ? { tripId: tripId } : {}),
      })
      .sort({ createdOn: -1 })
      .lean()
      .populate("trip", ["city", "country", "_id"]);
    if (note.length === 0) {
      throw new notFoundError("No notes found");
    }
    res.json(note);
  } catch (e) {
    next(e);
  }
};

const getNoteDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const note = await noteModel
      .findOne({
        _id: id,
        userId: user._id,
      })
      .lean()
      .populate("trip");

    if (!note) {
      throw new notFoundError("note not found");
    }
    res.json(note);
  } catch (e) {
    next(e);
  }
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const trip = await Tripmodel.findOne({
      _id: req.body.tripId,
      userId: user._id,
    });

    if (!trip) {
      throw new notFoundError("Trip not found");
    }

    const note = new noteModel({
      ...req.body,
      userId: user._id,
    });
    const result = await note.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    // make sure trip exists AND that the trip belongs to the user
    if (req.body.tripId) {
      const trip = await Tripmodel.findOne({
        _id: req.body.tripId,
        userId: user._id,
      });

      if (!trip) {
        throw new notFoundError("Trip not found");
      }
    }

    // { new: true } om ge-update versie terug te krijgen
    const note = await noteModel.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) {
      throw new notFoundError("note not found");
    }
    res.json(note);
  } catch (e) {
    next(e);
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const note = await noteModel.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!note) {
      throw new notFoundError("note not found");
    }
    res.json({ message: `Note with id ${id} deleted` });
  } catch (e) {
    next(e);
  }
};

export { getNotes, createNote, getNoteDetail, updateNote, deleteNote };
