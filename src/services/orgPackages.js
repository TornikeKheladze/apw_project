import { instance } from "./axios";

export const getOrgPackages = () => {
  return instance.get("/user/active/package");
};

export const getOrgPackageById = (id) => {
  return instance.get(`/user/active/package/get/${id}`);
};

export const insertOrgPackage = (data) => {
  return instance.post("/user/active/package/insert", data);
};

export const updateOrgPackage = (data) => {
  return instance.put(`/user/active/package/update/${data.id}`, data);
};

export const deleteOrgPackage = (id) => {
  return instance.delete(`/user/active/package/delete/${id}`);
};

export const searchOrgPackage = (data) => {
  return instance.post("/user/active/package/search", data);
};
