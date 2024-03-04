import { billingInstance } from "./axios";

export const getOurErrorList = async () => {
  return billingInstance.get("/error-list");
};

export const getOurErrorById = async (id) => {
  return billingInstance.get(`/error-list/${id}`);
};

export const addOurError = async (data) => {
  return billingInstance.post("/error-list", data);
};

export const editOurError = async (data, id) => {
  return billingInstance.put(`/error-list/${id}`, data);
};

export const deleteOurError = async (id) => {
  return billingInstance.delete(`/error-list/${id}`);
};

// owners

export const getOwnerErrorList = async () => {
  return billingInstance.get("/owner-error-list");
};

export const getOwnerErrorById = async (id) => {
  return billingInstance.get(`/owner-error-list/${id}`);
};

export const addOwnerError = async (data) => {
  return billingInstance.post("/owner-error-list", data);
};

export const editOwnerError = async (data, id) => {
  return billingInstance.put(`/owner-error-list/${id}`, data);
};

export const deleteOwnerError = async (id) => {
  return billingInstance.delete(`/owner-error-list/${id}`);
};

export const filterOwnerError = async (data) => {
  return billingInstance.post("/owner-error-list/search", data);
};
