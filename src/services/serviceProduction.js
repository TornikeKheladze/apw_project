import { instance } from "./axios";

export const getServiceProduction = async () => {
  return instance.get("/service-production");
};

export const getServiceProductionById = async (id) => {
  return instance.get(`/service-production/${id}`);
};

export const addServiceProduction = async (data) => {
  return instance.post(`/service-production`, data);
};

export const editServiceProduction = async (data, id) => {
  return instance.put(`/service-production/${id}`, data);
};

export const deleteServiceProduction = async (id) => {
  return instance.delete(`/service-production/${id}`);
};

export const filterServiceProduction = async (data) => {
  return instance.post(`/service-production/search`, data);
};
