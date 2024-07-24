import { instance } from "./axios";

export const getUsersActivityStatisticSuperAdmin = ({ oid, data }) => {
  return instance.post(`/user/statistic/user/${oid}`, data);
};

export const getUsersDepartmentsStatisticSuperAdmin = ({ oid, data }) => {
  return instance.post(`/user/statistic/departments/${oid}`, data);
  // }
};

export const getUsersPositionsStatisticSuperAdmin = ({ oid, data }) => {
  return instance.post(`/user/statistic/positions/${oid}`, data);
};

export const getUsersActivityStatistic = (data) => {
  return instance.post(`/user/statistic/auth/user`, data);
};

export const getUsersDepartmentsStatistic = (data) => {
  return instance.post(`/user/statistic/auth/departments`, data);
  // }
};

export const getUsersPositionsStatistic = (data) => {
  return instance.post(`/user/statistic/auth/positions`, data);
};

export const getLogInfo = () => {
  return instance.post(`/log/info?page=${1532}`);
};
