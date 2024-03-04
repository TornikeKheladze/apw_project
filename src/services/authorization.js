import { instance } from "./axios";

export const login = async (data) => {
  return instance.post("login", data);
};

export const logout = async () => {
  return instance.post("logout");
};
