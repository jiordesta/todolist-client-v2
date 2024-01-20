import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  about_open: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setAboutDrawer: (state, action) => {
      state.about_open = action.payload;
    },
  },
});

export const { setAboutDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
