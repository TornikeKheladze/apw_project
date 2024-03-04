import { instance } from "./axios";

export const getServiceCategories = async () => {
  return instance.get("/service-categories");
};

export const getServiceCategoryById = async (id) => {
  return instance.get(`/service-categories/${id}`);
};

export const addServiceCategory = async (data) => {
  return instance.post("/service-categories", data);
};

export const editServiceCategory = async (data, id) => {
  return instance.put(`/service-categories/${id}`, data);
};

export const deleteServiceCategory = async (id) => {
  return instance.delete(`/service-categories/${id}`);
};
