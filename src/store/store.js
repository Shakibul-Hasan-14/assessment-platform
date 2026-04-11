import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import testsReducer from "./testsSlice";
import manageTestReducer from "./manageTestSlice";
import candidateTestsReducer from "./candidateTestsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tests: testsReducer,
    manageTest: manageTestReducer,
    candidateTests: candidateTestsReducer,
  },
});
