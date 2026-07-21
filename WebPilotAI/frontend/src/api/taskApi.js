import apiClient from "./apiClient";

export const getTasks = async () => {
  const response = await apiClient.get("/tasks");
  return response.data;
};

export const getTask = async (id) => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const executeTask = async (taskData) => {
  const response = await apiClient.post("/tasks/execute", taskData);
  return response.data;
};