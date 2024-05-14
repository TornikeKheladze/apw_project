import { instance } from "./axios";

export const getUsersByTypeAndId = (type, id) => {
  return instance.get(`user/users/${type}/${id}`);
};

export const getAllUsers = () => {
  return instance.get(`user/users/`);
};

export const getAuthorizedUser = () => {
  return instance.get(`user/users/authentication-user`);
};

export const createUser = (userData) => {
  return instance.post("user/users", userData);
};

export const getUserDetails = (user_id) => {
  return instance.get(`/user/users/users/${user_id}`);
};

export const updateUserData = (data) => {
  return instance.put("/user/users", data);
};

export const updatePassword = (data) => {
  return instance.put("update", data);
};

export const deleteUser = (id) => {
  return instance.delete("/user/users", {
    data: { id },
  });
};

export const checkUserPassword = (data) => {
  return instance.post("/user/users/check-password", data);
};
