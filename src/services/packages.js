import { instance } from "./axios";

export const getPackages = async () => {
  const response = await instance.get("/user/package");
  return response;
};

export const getPackageById = async (id) => {
  const response = await instance.get(`/user/package/get/${id}`);
  return response;
};

export const searchPackage = async (data) => {
  const response = await instance.post("/user/package/search", data);
  return response;
};

export const insertPackage = (data) => {
  return instance.post("/user/package/insert", data);
};

export const updatePackage = async (data) => {
  const response = await instance.put(`/user/package/update/${data.id}`, data);
  return response;
};

export const deletePackage = async (id) => {
  const response = await instance.delete(`/user/package/delete/${id}`);
  return response;
};

export const activatePackage = (invoiceId) => {
  return instance.get(`/admin/package-active/${invoiceId}`);
};
