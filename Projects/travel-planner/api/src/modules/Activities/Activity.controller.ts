import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";
import notFoundError from "../../middleware/Error/notFoundError";
import Tripmodel from "../Trips/Trip.model";
import activityModel from "./Activity.model";

const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { tripId } = req.query;

    const activity = await activityModel
      .find({
        userId: user._id,
        ...(tripId ? { tripId: tripId } : {}),
      })
      .sort({ date: 1, startTime: 1 })
      .lean()
      .populate("trip", ["city", "country", "_id"]);
    if (activity.length === 0) {
      throw new notFoundError("No activities found");
    }
    res.json(activity);
  } catch (e) {
    next(e);
  }
};

const getActivityDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const activity = await activityModel
      .findOne({
        _id: id,
        userId: user._id,
      })
      .lean()
      .populate("trip");

    if (!activity) {
      throw new notFoundError("activity not found");
    }
    res.json(activity);
  } catch (e) {
    next(e);
  }
};

const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const trip = await Tripmodel.findOne({
      _id: req.body.tripId,
      userId: user._id,
    });

    if (!trip) {
      throw new notFoundError("Trip not found");
    }

    const activity = new activityModel({
      ...req.body,
      userId: user._id,
    });
    const result = await activity.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

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
    const activity = await activityModel.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!activity) {
      throw new notFoundError("activity not found");
    }
    res.json(activity);
  } catch (e) {
    next(e);
  }
};

const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const activity = await activityModel.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!activity) {
      throw new notFoundError("activity not found");
    }
    res.json({ message: `activity with id ${id} deleted` });
  } catch (e) {
    next(e);
  }
};

export { getActivities, createActivity, getActivityDetail, updateActivity, deleteActivity};
