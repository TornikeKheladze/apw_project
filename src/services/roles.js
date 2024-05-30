import { instance } from "./axios";

export const getRolesAndPermissionsData = async (app) => {
  return instance.post(`${app}/permissions/permission`);
};

export const getRolesData = async () => {
  return instance.post("all/permission");
};

export const getSuperAdminData = async () => {
  return instance.post("user/users/permission");
};

export const addSuperAdminRole = async (data) => {
  return instance.post("user/users/role", data);
};

export const updateSuperAdminRole = async (data) => {
  return instance.post("user/users/role/update", data);
};

export const deleteSuperAdminRole = async (data) => {
  const response = await instance.post("user/users/remove-role", data);
  return response;
};

export const setRolesToUser = async (data) => {
  return instance.post(`${data.url}/permissions/user-pas-permission`, data);
};

export const removeRolesFromUser = async (data) => {
  return instance.post(
    `${data.url}/permissions/user-pas-permission-remove`,
    data
  );
};

export const addRole = async (data, app) => {
  const response = await instance.post(`/${app}/permissions/role`, data);
  return response;
};

export const deleteRoleById = async (data, app) => {
  const response = await instance.post(`/${app}/permissions/remove-role`, data);
  return response;
};
