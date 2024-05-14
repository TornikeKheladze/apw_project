import { instance } from "./axios";

export const getOwnerStatistic = () => {
  return instance.get("/billing-java/statistic");
};

export const getAgentStatistic = () => {
  return instance.get("/billing-java/agent-statistic");
};

export const getAgentMonthlyStatistic = () => {
  return instance.get("/billing-java/agent-monthly-statistics");
};

export const getOwnerMonthlyStatistic = () => {
  return instance.get("/billing-java/monthly-statistics");
};
