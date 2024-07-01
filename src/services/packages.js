import { instance } from "./axios";

export const getPackages = async () => {
  const response = await instance.get("/user/package");
  return response;
};

export const getRingPackages = async () => {
  const response = await instance.get("/user/ring-package");
  return response;
};

export const getPackageById = async (id) => {
  const response = await instance.get(`/user/package/get/${id}`);
  return response;
};

export const getRingPackageById = async (id) => {
  const response = await instance.get(`/user/ring-package/get/${id}`);
  return response;
};

export const searchPackage = async (data) => {
  const response = await instance.post("/user/package/search", data);
  return response;
};

export const searchRingPackage = async (data) => {
  const response = await instance.post("/user/ring-package/search", data);
  return response;
};

export const insertPackage = (data) => {
  return instance.post("/user/package/insert", data);
};

export const insertRingPackage = (data) => {
  return instance.post("/user/ring-package/insert", data);
};

export const updatePackage = async (data) => {
  const response = await instance.put(`/user/package/update/${data.id}`, data);
  return response;
};

export const updateRingPackage = async (data) => {
  const response = await instance.put(
    `/user/ring-package/update/${data.id}`,
    data
  );
  return response;
};

export const deletePackage = async (id) => {
  const response = await instance.delete(`/user/package/delete/${id}`);
  return response;
};

export const deleteRingPackage = async (id) => {
  const response = await instance.delete(`/user/ring-package/delete/${id}`);
  return response;
};

export const activatePackage = (invoiceId) => {
  return instance.get(`/admin/package-active/${invoiceId}`);
};
