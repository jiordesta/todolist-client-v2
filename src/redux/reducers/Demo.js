import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  top: 0,
  left: 0,
  index: 0,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    setPosition: (state, action) => {
      state.top = action.payload.top;
      state.left = action.payload.left;
      state.index = state.index + 1;
    },
  },
});

export const { setPosition } = demoSlice.actions;
export default demoSlice.reducer;
