import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlices";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});