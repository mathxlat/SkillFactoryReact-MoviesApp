import { createSlice } from "@reduxjs/toolkit";

const initialState={  value: 0,
}
export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const { title, authors, year, thumbnailUrl, description, isbn } =
        action.payload;
      // const id = v4();
      // state.push({ id, title, authors, year, thumbnailUrl, description, isbn });
    },
  },
});

export const { addBook } = usersSlice.actions;
export default usersSlice.reducer;
