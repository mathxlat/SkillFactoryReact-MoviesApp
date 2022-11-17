import { createSlice } from "@reduxjs/toolkit";
export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
      addBook: (state, action) => {
        const { title, authors, year, thumbnailUrl, description, isbn } =
          action.payload;
        const id = v4();
        state.push({ id, title, authors, year, thumbnailUrl, description, isbn });
      },
      editBook: (state, action) => {
        const { id, title, authors, year, thumbnailUrl, description, isbn } =
          action.payload;
        const foundBook = state.find((book) => book.id === id);
        if (foundBook) {
          foundBook.title = title;
          foundBook.description = description;
          foundBook.isbn = isbn;
          foundBook.year = year;
          foundBook.thumbnailUrl = thumbnailUrl;
          foundBook.authors = authors.split(",");
        }
      },
      deleteBook: (state, action) => {
        //debo pasar solo el id por payload
        const books = state.find((book) => book.id === action.payload);
        state.splice(state.indexOf(books), 1);
      },
    },
  });
  
  export const { addBook, editBook, deleteBook } = booksSlice.actions;
  export default booksSlice.reducer;