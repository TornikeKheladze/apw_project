import { instance } from "./axios";

export const getAllServices = () => {
  return instance.get("/billing-java/services");
};

export const getServiceById = async (id) => {
  return instance.get(`/billing-java/services/${id}`);
};

export const createService = async (data) => {
  return instance.post("/billing-java/services", data);
};

export const updateService = async (data) => {
  return instance.put(`/billing-java/services`, data);
};

export const deleteService = async (id) => {
  return instance.delete(`/billing-java/services/${id}`);
};
