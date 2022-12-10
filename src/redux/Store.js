import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./movieSlice";
import { usersSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    movies: moviesSlice,
  },
});
