import { NextFunction, Request, Response } from "express";
import Trip from "./Trip.model";
import notFoundError from "../../middleware/Error/notFoundError";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";

const getTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const trips = await Trip.find({
      userId: user._id,
    }).sort({ startDate: 1 });
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const trip = new Trip({...req.body, userId: user._id});
    const result = await trip.save();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
};

const getTripById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const trip = await Trip.findOne({
      _id: id,
      userId: user._id,
    });
    if (!trip) {
      throw new notFoundError("Trip not found");
    }
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const trip = await Trip.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!trip) {
      throw new notFoundError("Trip not found");
    }
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const trip = await Trip.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!trip) {
      throw new notFoundError("Trip not found");
    }
    res.json({ message: `Trip with id:${id} has been deleted` });
  } catch (err) {
    next(err);
  }
};

export { getTrips, createTrip, getTripById, updateTrip, deleteTrip };
