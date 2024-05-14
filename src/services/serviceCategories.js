import { instance } from "./axios";

export const getCategories = async () => {
  return instance.get("/billing-java/categories");
};

export const deleteCategory = async (id) => {
  return instance.delete(`/billing-java/categories/${id}`);
};

export const createCategory = async (data) => {
  return instance.post("/billing-java/categories", data);
};

export const updateCategory = async (data) => {
  return instance.put("/billing-java/categories", data);
};

export const getCategoryById = async (id) => {
  return instance.get(`/billing-java/categories/${id}`);
};

export const getCategoryProduction = async () => {
  return instance.get("/billing-java/category-production");
};

export const deleteCategoryProduction = async (id) => {
  return instance.delete(`/billing-java/category-production/${id}`);
};

export const createCategoryProduction = async (data) => {
  return instance.post("/billing-java/category-production", data);
};

export const updateCategoryProduction = async (data) => {
  return instance.put("/billing-java/category-production", data);
};

export const getCategoryProductionById = async (id) => {
  return instance.get(`/billing-java/category-production/${id}`);
};
