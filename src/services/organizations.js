import { instance } from "./axios";

export const getOrganizations = async () => {
  const response = await instance.get("/user/organisations");
  return response;
};

export const addOrganization = async (data) => {
  const response = await instance.post("/user/organisations", data);
  return response;
};

export const updateOrganization = async (data) => {
  const response = await instance.put("/user/organisations", data);
  return response;
};

export const deleteOrganization = async (id) => {
  const response = await instance.delete("/user/organisations", {
    data: { id },
  });
  return response;
};

export const getOrganizationById = (id) =>
  instance.get(`/user/organisations/get/${id}`);
