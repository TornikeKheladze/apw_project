import { instance } from "./axios";

export const getAllmessages = () => {
  return instance.get(`messages`);
};
