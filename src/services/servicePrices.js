import { instance } from "./axios";

export const getPrices = () => {
  return instance.get("/billing-java/prices");
};

export const getPriceById = (id) => {
  return instance.get(`/billing-java/prices/${id}`);
};

export const createPrice = (data) => {
  return instance.post("/billing-java/prices", data);
};

export const updatePrice = (data) => {
  return instance.put("/billing-java/prices", data);
};

export const deletePrice = (id) => {
  return instance.delete(`/billing-java/prices/${id}`);
};

export const getSpecPrices = () => {
  return instance.get("/billing-java/spec-prices");
};

export const getSpecPriceById = (id) => {
  return instance.get(`/billing-java/spec-prices/${id}`);
};

export const createSpecPrice = (data) => {
  return instance.post("/billing-java/spec-prices", data);
};

export const updateSpecPrice = (data) => {
  return instance.put("/billing-java/spec-prices", data);
};

export const deleteSpecPrice = (id) => {
  return instance.delete(`/billing-java/spec-prices/${id}`);
};
