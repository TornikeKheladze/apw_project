import { instance } from "./axios";

export const getServiceProduction = async () => {
  return instance.get("/billing-java/service-production");
};

export const getServiceProductionById = async (id) => {
  return instance.get(`/billing-java/service-production/${id}`);
};

export const createServiceProduction = async (data) => {
  return instance.post(`/billing-java/service-production`, data);
};

export const updateServiceProduction = async (data) => {
  return instance.put(`/billing-java/service-production`, data);
};

export const deleteServiceProduction = async (id) => {
  return instance.delete(`/billing-java/service-production/${id}`);
};
