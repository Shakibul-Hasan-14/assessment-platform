import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import testsReducer from "./testsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tests: testsReducer,
  },
});
