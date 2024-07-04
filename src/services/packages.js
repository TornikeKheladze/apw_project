import { instance } from "./axios";

export const getPackages = () => {
  return instance.get("/user/package");
};

export const getPackageDetails = (packageId) => {
  return instance.get(`/user/package/details/${packageId}`);
};

export const getRingPackages = () => {
  return instance.get("/user/ring-package");
};

export const getPackageById = (id) => {
  return instance.get(`/user/package/get/${id}`);
};

export const getRingPackageById = (id) => {
  return instance.get(`/user/ring-package/get/${id}`);
};

export const searchPackage = (data) => {
  return instance.post("/user/package/search", data);
};

export const searchRingPackage = (data) => {
  return instance.post("/user/ring-package/search", data);
};

export const insertPackage = (data) => {
  return instance.post("/user/package/insert", data);
};

export const insertRingPackage = (data) => {
  return instance.post("/user/ring-package/insert", data);
};

export const updatePackage = (data) => {
  return instance.put(`/user/package/update/${data.id}`, data);
};

export const updateRingPackage = (data) => {
  return instance.put(`/user/ring-package/update/${data.id}`, data);
};

export const deletePackage = (id) => {
  return instance.delete(`/user/package/delete/${id}`);
};

export const deleteRingPackage = (id) => {
  return instance.delete(`/user/ring-package/delete/${id}`);
};

export const activatePackage = (invoiceId) => {
  return instance.get(`/admin/package-active/${invoiceId}`);
};

export const getPaymentDiagram = (activePackageId) => {
  return instance.get(`user/active/package/diagram/${activePackageId}`);
};
