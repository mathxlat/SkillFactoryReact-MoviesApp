import { createSlice } from "@reduxjs/toolkit";
import getMovies from "../utils/InitialState";

const initialState = await getMovies();
// console.log("estado inicial:", initialState);
export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const { title, authors, year, thumbnailUrl, description, isbn } =
        action.payload;
    },
  },
});

export const { addBook } = moviesSlice.actions;
export default moviesSlice.reducer;
//unica solucion thunk! 