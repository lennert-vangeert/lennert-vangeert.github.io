export type Note = {
  _id?: string;
  title: string;
  content: string;
};

export type FullNote = Omit<Note, "_id"> & {
  tripId: string;
  userId: string;
};


export type NoteBody = Omit<Note, "_id">;
