import { instance } from "./axios";

export const getUsersActivityStatistic = (oid) => {
  return instance.get(`/user/statistic/user/${oid || ""}`);
};

export const getUsersDepartmentsStatistic = (oid) => {
  return instance.get(`/user/statistic/departments/${oid || "72"}`);
};

export const getUsersPositionsStatistic = (oid) => {
  return instance.get(`/user/statistic/positions/${oid || "72"}`);
};
