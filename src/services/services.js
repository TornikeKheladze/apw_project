import { instance } from "./axios";

export const getServices = async () => {
  return instance.get("/services");
};
export const getServiceById = async (id) => {
  return instance.get(`/services/${id}`);
};

export const deleteService = async (id) => {
  return instance.delete(`/services/${id}`);
};

export const filterService = async (data) => {
  return instance.post("/services/search", data);
};

export const addService = async (data) => {
  return instance.post("/services", data);
};

export const editService = async (data, id) => {
  return instance.put(`/services/${id}`, data);
};
// currency
export const getCurrencies = async () => {
  return instance.get("/currency");
};

// export const getTransactions = async (page) => {
//   return instance.get(`/transactions?page=${page}`);
// };
// export const filterTransactions = async (data, page) => {
//   return instance.post(`/transactions/filter?page=${page}`, data);
// };

// export const getTransactionById = async (id) => {
//   return instance.get(`/transactions/${id}`);
// };
