import { API } from "@core/network/api";
import { Note, NoteBody } from "./notes.types";
import qs from "query-string";

type Query = {
  tripId?: string;
};

const getNotes = (query: Query = {}) => {
  return API.get<Note[]>(`/notes?${qs.stringify(query)}`);
};

const getNoteById = (id: string) => {
  console.log(`/notes/${id}`)
  return API.get<Note>(`/notes/${id}`);
};

const createNote = (note: NoteBody) => {
  console.log(note)
  return API.post<Note>("/notes/", note);
};

const updateNote = ( note: NoteBody, id: string,) => {
  console.log(note, id)
  return API.patch<Note>(`/notes/${id}`, note);
};

const deleteNote = (id: string) => {
  console.log(id)
  return API.delete<Note>(`/notes/${id}`);
};

export { getNotes, getNoteById, createNote, updateNote, deleteNote };
