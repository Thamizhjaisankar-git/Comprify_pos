// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice"; // Import user slice

export const store = configureStore({
  reducer: {
    user: userReducer, // Add user reducer
  },
});
