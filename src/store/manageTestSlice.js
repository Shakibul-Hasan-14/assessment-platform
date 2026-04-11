import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Basic info
  basicInfo: null,
  currentTestId: null,
  // Questions
  questions: [],
  loadingQuestions: false,
  // UI state
  loading: false,
  error: null,
};

const manageTestSlice = createSlice({
  name: "manageTest",
  initialState,
  reducers: {
    setBasicInfo(state, action) {
      state.basicInfo = action.payload;
    },
    setCurrentTestId(state, action) {
      state.currentTestId = action.payload;
    },
    fetchQuestionsStart(state) {
      state.loadingQuestions = true;
      state.error = null;
    },
    fetchQuestionsSuccess(state, action) {
      state.loadingQuestions = false;
      state.questions = action.payload;
    },
    fetchQuestionsFailure(state, action) {
      state.loadingQuestions = false;
      state.error = action.payload;
    },
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
    updateQuestion(state, action) {
      const index = state.questions.findIndex(
        (q) => q.id === action.payload.id,
      );
      if (index !== -1) state.questions[index] = action.payload;
    },
    removeQuestion(state, action) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },
    resetManageTest(state) {
      state.basicInfo = null;
      state.currentTestId = null;
      state.questions = [];
      state.error = null;
    },
  },
});

export const {
  setBasicInfo,
  setCurrentTestId,
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  addQuestion,
  updateQuestion,
  removeQuestion,
  resetManageTest,
} = manageTestSlice.actions;

export default manageTestSlice.reducer;
