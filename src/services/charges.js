import { instance } from "./axios";

export const getCharges = () => {
  return instance.get("/billing-java/charges");
};

export const getChargeById = (id) => {
  return instance.get(`/billing-java/charges/${id}`);
};

export const createCharge = (data) => {
  return instance.post("/billing-java/charges", data);
};

export const updateCharge = (data) => {
  return instance.put("/billing-java/charges", data);
};

export const deleteCharge = (id) => {
  return instance.delete(`/billing-java/charges/${id}`);
};
