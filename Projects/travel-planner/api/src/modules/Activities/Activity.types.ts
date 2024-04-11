import { Document, ObjectId } from "mongoose";
import { Trip } from "../Trips/Trip.types";


export type Activity = Document & {
    _id?: string;
    title: string;
    description: string;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    userId: ObjectId;
    tripId: ObjectId;
    trip?: Trip;
}