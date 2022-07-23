import axios from "axios";
import { host } from ".";
import { NoteCreateDto, NoteType } from "../types/NoteType";

export const getNotes = async (token: string) => {
  let response = await axios.get<NoteType[]>(`http://localhost:8000/note`, {headers:
    { 'Authorization': `Bearer ${token}`}});
  response.data.forEach((value) => {
    value.created_at = new Date(value.created_at);
  });
  return response.data;
}

export const login = async (email: string, password: string) => {
  let response = await axios.post<string>("http://localhost:8000/auth/login", {
    email: email,
    password: password
  });
  return response.data;
}

export const createNote = async (post: NoteCreateDto, token: string) => {
  await axios.post<string>("http://localhost:8000/note", post,
    {headers: { 'Authorization': `Bearer ${token}` }});
}

export const deleteNote = async (id: string, token: string) => {
  await axios.delete<boolean>(`http://localhost:8000/note/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export const markNote = async (note_id: string, token: string) => {
  await axios.post<boolean>(`http://localhost:8000/note/mark/${note_id}`, {}, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export const updateNote = async (form: {
    note_id: string,
    name?: string,
    text?: string,
  }, token: string) => {
    await axios.put<boolean>(`http://localhost:8000/note/${form.note_id}`, {
      name: form.name,
      text: form.text,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
}

export const register = async (form: {
  name: string,
  email: string,
  password: string,
}) => {
  await host.post<string>(`auth/register`, {
    name: form.name,
    email: form.email,
    password: form.password,
  });
}
