// ORGANIZATION TYPE CRUD

import { instance } from "./axios";

export const addOrganizationType = async (data) => {
  const response = await instance.post("/user/organisations/type", {
    name: data,
  });
  return response;
};

export const deleteOrganizationType = async (id) => {
  const response = await instance.delete("/user/organisations/type", {
    data: { id },
  });
  return response;
};

export const updateOrganizationType = async (data) => {
  const response = await instance.put("/user/organisations/type", data);
  return response;
};

export const getOrganizationsTypes = async () => {
  const response = await instance.get("/user/organisations/type");
  return response;
};

export const getOrganizationsTypeById = async (id) => {
  const response = await instance.get(`/user/organisations/type/get/${id}`);
  return response;
};
