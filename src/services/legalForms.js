import { instance } from "./axios";

export const getLegalForms = async () => {
  return instance.get("/legal-form");
};

export const addLegalForm = async (data) => {
  return await instance.post("/legal-form", data);
};

export const deleteLegalForm = async (id) => {
  return instance.delete(`/legal-form/${id}`);
};

export const editLegalForm = async (data, id) => {
  return instance.put(`/legal-form/${id}`, data);
};

export const getLegalFormById = async (id) => {
  return instance.get(`/legal-form/${id}`);
};
