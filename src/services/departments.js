import { instance } from "./axios";

export const getDepartments = async (oid) => {
  const response = await instance.get(`/user/departments/${oid}`);
  return response;
};

export const addDepartment = async (data) => {
  const response = await instance.post("/user/departments", data);
  return response;
};

export const getDepartmentById = async (oid) => {
  const response = await instance.get(`/user/departments/get/${oid}`);
  return response;
};

export const deleteDepartment = async (id) => {
  const response = await instance.delete("/user/departments", { data: { id } });
  return response;
};

export const editDepartment = async (data) => {
  const response = await instance.put("/user/departments", data);
  return response;
};
