import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
  activeTest: null,
  loading: false,
  error: null,
};

const candidateTestsSlice = createSlice({
  name: "candidateTests",
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
    setActiveTest(state, action) {
      state.activeTest = action.payload;
    },
    clearActiveTest(state) {
      state.activeTest = null;
    },
  },
});

export const {
  fetchTestsStart,
  fetchTestsSuccess,
  fetchTestsFailure,
  setActiveTest,
  clearActiveTest,
} = candidateTestsSlice.actions;

export default candidateTestsSlice.reducer;
