import api from "./api";

export const getCandidateTests = async () => {
  const response = await api.get("/candidate/tests");
  return response.data;
};

export const getCandidateTestById = async (id) => {
  const response = await api.get(`/candidate/tests/${id}`);
  return response.data;
};

export const submitTest = async (id, answers) => {
  const response = await api.post(`/candidate/tests/${id}/submit`, { answers });
  return response.data;
};
