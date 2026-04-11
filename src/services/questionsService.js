import api from "./api";

export const getQuestions = async (testId) => {
  const response = await api.get(`/employer/tests/${testId}/questions`);
  return response.data;
};

export const createQuestion = async (testId, questionData) => {
  const response = await api.post(
    `/employer/tests/${testId}/questions`,
    questionData,
  );
  return response.data;
};

export const updateQuestion = async (testId, questionId, questionData) => {
  const response = await api.put(
    `/employer/tests/${testId}/questions/${questionId}`,
    questionData,
  );
  return response.data;
};

export const deleteQuestion = async (testId, questionId) => {
  const response = await api.delete(
    `/employer/tests/${testId}/questions/${questionId}`,
  );
  return response.data;
};
