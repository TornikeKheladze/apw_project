import { instance } from "./axios";

export const getOrganizations = async () => {
  const response = await instance.get("/user/organisations");
  return response;
};

export const addOrganization = async (data) => {
  const response = await instance.post("/user/organisations", data);
  return response;
};

export const updateOrganization = async (data) => {
  const response = await instance.put("/user/organisations", data);
  return response;
};

export const deleteOrganization = async (id) => {
  const response = await instance.delete("/user/organisations", {
    data: { id },
  });
  return response;
};

export const getOrganizationById = (id) =>
  instance.get(`/user/organisations/get/${id}`);

export const getStatements = (data) => {
  return instance.post("/auth-user/gov-get-auth", data);
};

export const getStatementsExpDate = (data) => {
  return instance.post("/auth-user/gov-get-auth-package", data);
};

export const getStatementById = (id) => {
  return instance.post("/auth-user/gov-get", {
    auth_id: id,
  });
};

export const getSips = () => {
  return instance.get("/user/organisations/sip");
};

export const secondStep = (data) => {
  return instance.post(`/second-step/${data.action}`, data);
};

export const firstStep = (data) => {
  return instance.post(`/first-step/${data.action}`, data);
};

export const getGovInfo = () => {
  return instance.get("/gov-info");
};

export const firstStepInsert = (data) => {
  return instance.post("auth-user/gov-insert", data);
};
export const secondStepInsert = (data) => {
  return instance.post("second-step/insert", data);
};
