import { instance } from "./axios";

export const getServices = () => {
  return instance.get("/services");
};

export const getTransactions = (page) => {
  return instance.get(`/transactions?page=${page}`);
};

export const filterTransactions = (data, page) => {
  return instance.post(`/transactions/filter?page=${page}`, data);
};

export const editTransactionStatus = (id, data) => {
  return instance.put(`/transactions/${id}`, data);
};

export const filterTransactionsWithoutPage = (data) => {
  return instance.post(`/transactions/filter/not/pagination`, data);
};

export const getPayer = (data) => {
  return instance.post("/payers/search", data);
};

export const getSumData = (data) => {
  return instance.post("/transactions/sum", data);
};

export const getNominalStatistic = (data) => {
  return instance.post("/nominal-account", data);
};

export const getNominalForAgent = (type, data) => {
  return instance.post(`/nominal-account/${type}`, data);
};

export const getActs = (data) => {
  return instance.post("acts", data);
};

//

export const getTransactionsByPage = (page) => {
  return instance.get(`/billing-java/transactions/get/${page}/50`);
};

export const searchTransactions = ({
  data = {},
  page,
  sort = "transactionID,desc",
}) => {
  // დროებით ვაყოლებ ობიექტს რო ჯავას ერორი ავირიდო
  return instance.post(
    `/billing-java/transactions/search/${page}/50/${sort}`,
    Object.keys(data).length === 0 ? { transactionID: " " } : data
  );
};

export const getTransactionById = (id) => {
  return instance.get(`/billing-java/transactions/id/${id}`);
};
