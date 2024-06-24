import { instance } from "./axios";

export const login = (data) => {
  return instance.post("login", data);
};

export const logout = () => {
  return instance.post("logout");
};

export const sendLoginSms = (data) => {
  return instance.post("sms-valid", data);
};
