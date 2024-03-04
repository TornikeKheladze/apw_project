import { instance } from "./axios";

export const getServices = async () => {
  return instance.get("/services");
};

export const addTransaction = async (data) => {
  return instance.post("/transactions", data);
};

export const getTransactions = async (page) => {
  return instance.get(`/transactions?page=${page}`);
};

export const filterTransactions = async (data, page) => {
  return instance.post(`/transactions/filter?page=${page}`, data);
};

export const getTransactionById = async (id) => {
  return instance.get(`/transactions/${id}`);
};

export const editTransactionStatus = async (id, data) => {
  return instance.put(`/transactions/${id}`, data);
};

export const filterTransactionsWithoutPage = async (data) => {
  return instance.post(`/transactions/filter/not/pagination`, data);
};

export const getPayer = async (data) => {
  return instance.post("/payers/search", data);
};

export const getSumData = async (data) => {
  return instance.post("/transactions/sum", data);
};

export const getNominalStatistic = async (data) => {
  return instance.post("/nominal-account", data);
};

export const getNominalForAgent = async (type, data) => {
  return instance.post(`/nominal-account/${type}`, data);
};

export const getActs = async (data) => {
  return instance.post("acts", data);
};
