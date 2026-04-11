import api from "./api";

export const getEmployerTests = async () => {
  const response = await api.get("/employer/tests");
  return response.data;
};

export const createTest = async (testData) => {
  const response = await api.post("/employer/tests", testData);
  return response.data;
};
