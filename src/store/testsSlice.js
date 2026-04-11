import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
  loading: false,
  error: null,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    fetchTestsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTestsSuccess(state, action) {
      state.loading = false;
      state.tests = action.payload;
    },
    fetchTestsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addTest(state, action) {
      state.tests.push(action.payload);
    },
  },
});

export const {
  fetchTestsStart,
  fetchTestsSuccess,
  fetchTestsFailure,
  addTest,
} = testsSlice.actions;
export default testsSlice.reducer;
