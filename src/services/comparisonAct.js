import { instance } from "./axios";

export const getActs = async (data) => {
  return instance.post("acts", data);
};

export const getAct = async (data) => {
  return instance.post("acts/act", data);
};

export const getActDetail = async (data) => {
  return instance.post("acts/detail", data);
};

export const getGeorgianNumber = async (number, currency) => {
  return instance.get(`setting/translate/${number}/${currency}`);
};
