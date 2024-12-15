import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations.js";
import { logOut } from "../auth/operations.js";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload, ...state.items];
        // state.items.push(action.payload)
        // state.items.unshift(action.payload)
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        // state.items = state.items.filter(
        //   (item) => item.id !== action.payload.id
        // );
        const index = state.items.findIndex((item) => {
          return item.id === action.payload.id;
        });
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default contactSlice.reducer;
