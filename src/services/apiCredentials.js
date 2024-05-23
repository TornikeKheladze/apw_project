import { instance } from "./axios";

export const getApiCredentials = () => {
  return instance.get("/billing-java/api-credential");
};

export const getApiCredentialsById = (id) => {
  return instance.get(`/billing-java/api-credential/${id}`);
};

export const createApiCredentials = (data) => {
  return instance.post("/billing-java/api-credential", data);
};

export const deleteApiCredentials = (id) => {
  return instance.delete(`/billing-java/api-credential/${id}`);
};
