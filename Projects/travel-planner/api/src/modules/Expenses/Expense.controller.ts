import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middleware/Auth/authMiddleware";
import notFoundError from "../../middleware/Error/notFoundError";
import Tripmodel from "../Trips/Trip.model";
import expenseModel from "./Expense.model";

const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { tripId } = req.query;

    const expense = await expenseModel
      .find({
        userId: user._id,
        ...(tripId ? { tripId: tripId } : {}),
      })
      .sort({ createdOn: 1 })
      .lean()
      .populate("trip", ["city", "country", "_id"]);
    if (expense.length === 0) {
      throw new notFoundError("No expenses found");
    }
    res.json(expense);
  } catch (e) {
    next(e);
  }
};

const getExpenseDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const expense = await expenseModel
      .findOne({
        _id: id,
        userId: user._id,
      })
      .lean()
      .populate("trip");

    if (!expense) {
      throw new notFoundError("expense not found");
    }
    res.json(expense);
  } catch (e) {
    next(e);
  }
};

const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const trip = await Tripmodel.findOne({
      _id: req.body.tripId,
      userId: user._id,
    });

    if (!trip) {
      throw new notFoundError("Trip not found");
    }

    const expense = new expenseModel({
      ...req.body,
      userId: user._id,
    });
    const result = await expense.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
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
    const expense = await expenseModel.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) {
      throw new notFoundError("expense not found");
    }
    res.json(expense);
  } catch (e) {
    next(e);
  }
};

const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const expense = await expenseModel.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (!expense) {
      throw new notFoundError("expense not found");
    }
    res.json({ message: `expense with id ${id} deleted` });
  } catch (e) {
    next(e);
  }
};

export { getExpenses, createExpense, getExpenseDetail, updateExpense, deleteExpense};
