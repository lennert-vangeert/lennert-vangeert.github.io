export type Activity = {
  _id?: string;
  title: string;
  description: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type FullActivity = Omit<Activity, "_id"> & {
  tripId: string;
  userId: string;
};

export type ActivityBody = Omit<Activity, "_id">;
