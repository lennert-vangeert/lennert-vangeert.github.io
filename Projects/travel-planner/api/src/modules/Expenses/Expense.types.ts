import { Document, ObjectId } from "mongoose";
import { Trip } from "../Trips/Trip.types";


export type Expense = Document & {
    _id?: string;
    title: string;
    description: string;
    amount: string;
    userId: ObjectId;
    tripId: ObjectId;
    trip?: Trip;
}