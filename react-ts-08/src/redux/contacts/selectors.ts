import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectIsLoading = (state: RootState) => state.contacts.loading;
export const selectError = (state: RootState) => state.contacts.error;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContacts;
  }
);
