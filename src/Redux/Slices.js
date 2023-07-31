import { createSlice } from "@reduxjs/toolkit";

export const accessToken = createSlice({
  name: "counter",
  initialState: {
    accessToken: "",
  },
  // `createSlice` will infer the state type from the `initialState` argument

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: (state, action) => {
      state.accessToken = "";
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  addAccessToken,
  removeAccessToken,
} = accessToken.actions;

export default accessToken.reducer;
