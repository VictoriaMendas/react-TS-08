import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations.js";
import { logOut } from "../auth/operations.js";
import { Contact } from "../../@types/contacts";

interface ContactsInitialState {
  items: Contact[];
  loading: boolean;
  error: null | string;
}
const initialState: ContactsInitialState = {
  items: [],
  loading: false,
  error: null,
};
const handlePending = (state: ContactsInitialState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (
  state: ContactsInitialState,
  action: PayloadAction<unknown>
) => {
  state.loading = false;
  state.error = action.payload as string;
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.loading = false;
          state.items = [action.payload, ...state.items];
          // state.items.push(action.payload)
          // state.items.unshift(action.payload)
        }
      )
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.loading = false;
          // state.items = state.items.filter(
          //   (item) => item.id !== action.payload.id
          // );
          const index = state.items.findIndex((item) => {
            return item.id === action.payload.id;
          });
          state.items.splice(index, 1);
        }
      )
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default contactSlice.reducer;
