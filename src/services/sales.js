import { instance } from "./axios";

export const getSales = () => {
  return instance.get("/billing-java/sale");
};

export const createSale = (data) => {
  return instance.post("/billing-java/sale", data);
};

export const getSaleById = (id) => {
  return instance.get(`/billing-java/sale/${id}`);
};

export const updateSale = (data) => {
  return instance.put("/billing-java/sale", data);
};

export const deleteSale = (id) => {
  return instance.delete(`/billing-java/sale/${id}`);
};

export const getSaleStatuses = () => {
  return instance.get("/billing-java/sale-status");
};

export const getSaleStatusById = (id) => {
  return instance.get(`/billing-java/sale-status/${id}`);
};

export const createSaleStatus = (data) => {
  return instance.post("/billing-java/sale-status", data);
};

export const deleteSaleStatus = (id) => {
  return instance.delete(`/billing-java/sale-status/${id}`);
};
export const updateSaleStatus = (data) => {
  return instance.put("/billing-java/sale-status", data);
};
