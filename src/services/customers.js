import { instance } from "./axios";

export const getCustomers = async () => {
  return instance.get("/customers");
};

export const addCustomer = async (data) => {
  return await instance.post("/customers", data);
};

export const getCustomerById = async (id) => {
  return instance.get(`/customers/${id}`);
};

export const editCustomer = async (data) => {
  return await instance.put(`/customers/${data.id}`, data);
};

export const filterCustomers = async (data, page) => {
  return instance.post(`/customers/filter?page=${page}`, data);
};

export const filterCustomersWithoutPage = async (data) => {
  return instance.post(`/customers/filter/not/pagination`, data);
};

export const deleteCustomer = async (id) => {
  return instance.delete(`/customers/${id}`);
};
