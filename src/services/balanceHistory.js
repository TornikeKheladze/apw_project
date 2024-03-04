import { instance } from "./axios";

export const getBalanceHistory = async () => {
  return instance.get("/balance-history");
};

export const getBalanceHistoryByCustomerId = async (id) => {
  return instance.get(`/balance-history/${id}`);
};

export const addBalanceHistory = async (data) => {
  return instance.post("/balance-history", data);
};

export const editBalanceHistory = async (data, id) => {
  return instance.put(`/balance-history/${id}`, data);
};

export const deleteBalanceHistory = async (id) => {
  return instance.delete(`/balance-history/7/${id}`);
};

export const filterBalanceHistory = async (data) => {
  return instance.post("/balance-history/search", data);
};

export const getBalanceHistoryTypes = async () => {
  return instance.get("/balance-history-types");
};

export const getCurrentBalance = async () => {
  return instance.get("/customers/customers/balance");
};

export const balanceAction = async (data) => {
  return instance.post(`/balance-history/${data.type_id}`, data);
};

export const getBalanceSum = () => {
  return instance.post("/balance-history/sum");
};

export const balanceRecount = (data) => {
  return instance.post(`/balance-history/recount/${data.customer_id}`, data);
};

export const balanceNullify = (data) => {
  return instance.post(`/balance-history/understand/${data.customer_id}`, data);
};

export const getRates = (data) => {
  return instance.post("/cross-rates/search", data);
};
