import { instance } from "./axios";

export const getOrgPackages = () => {
  return instance.get("/user/active/package");
};

export const getRingActivePackages = () => {
  return instance.get("/user/ring-active/package");
};

export const getOrgPackageById = (id) => {
  return instance.get(`/user/active/package/get/${id}`);
};

export const getRingActivePackageById = (id) => {
  return instance.get(`/user/ring-active/package/get/${id}`);
};

export const insertOrgPackage = (data) => {
  return instance.post("/user/active/package/insert", data);
};

export const insertRingActivePackage = (data) => {
  return instance.post("/user/ring-active/package/insert", data);
};

export const updateOrgPackage = (data) => {
  return instance.put(`/user/active/package/update/${data.id}`, data);
};

export const updateRingActivePackage = (data) => {
  return instance.put(`/user/ring-active/package/update/${data.id}`, data);
};

export const deleteOrgPackage = (id) => {
  return instance.delete(`/user/active/package/delete/${id}`);
};
export const deleteRingActivePackage = (id) => {
  return instance.delete(`/user/ring-active/package/delete/${id}`);
};

export const searchOrgPackage = (data) => {
  return instance.post("/user/active/package/search", data);
};

export const searchRingActivePackage = (data) => {
  return instance.post("/user/ring-active/package/search", data);
};
