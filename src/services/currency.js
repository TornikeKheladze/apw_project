import { instance } from "./axios";

export const getCurrencies = async () => {
  return instance.get("/currency");
};

export const getCurrencyById = async (id) => {
  return instance.get(`/currency/${id}`);
};

export const addCurrency = async (data) => {
  return instance.post("/currency", data);
};

export const editCurrency = async (data, id) => {
  return instance.put(`/currency/${id}`, data);
};

export const deleteCurrency = async (id) => {
  return instance.delete(`/currency/${id}`);
};
