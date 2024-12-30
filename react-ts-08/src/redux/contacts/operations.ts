import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact } from "../../@types/contacts";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Contact[]>("/contacts");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact: Omit<Contact, "id">, thunkAPI) => {
    try {
      const response = await axios.post<Contact>("/contacts", newContact);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId: Contact["id"], thunkAPI) => {
    try {
      const response = await axios.delete<Contact>(`/contacts/${contactId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
