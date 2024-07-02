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

export const sendSms = (data) => {
  return instance.post("user/users/sms", data);
};

export const getMessages = () => {
  return instance.get("user/messages");
};

export const getMessageTypes = () => {
  return instance.get("user/messages/type");
};

export const createMessage = (data) => {
  return instance.post("user/messages", data);
};

export const updateMessage = (data) => {
  return instance.put(`user/messages/${data.id}`, data);
};

export const deleteMessage = (id) => {
  return instance.delete(`user/messages/${id}`);
};
