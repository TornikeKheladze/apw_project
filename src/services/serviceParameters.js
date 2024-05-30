import { instance } from "./axios";

export const getServiceParameters = () => {
  return instance.get("/billing-java/service-parameters");
};

export const createServiceParameter = (data) => {
  return instance.post("/billing-java/service-parameters", data);
};

export const getServiceParameterById = (id) => {
  return instance.get(`/billing-java/service-parameters/${id}`);
};

export const getServiceParametersByServiceID = (serviceID) => {
  return instance.get(
    `/billing-java/service-parameters/by-service-id/${serviceID}`
  );
};

export const updateServiceParameter = (data) => {
  return instance.put("/billing-java/service-parameters", data);
};

export const deleteServiceParameter = (id) => {
  return instance.delete(`/billing-java/service-parameters/${id}`);
};

export const getServiceParameterTypes = () => {
  return instance.get("/billing-java/service-parameter-types");
};

export const createServiceParameterType = (data) => {
  return instance.post("/billing-java/service-parameter-types", data);
};

export const getServiceParameterTypeById = (id) => {
  return instance.get(`/billing-java/service-parameter-types/${id}`);
};

export const updateServiceParameterType = (data) => {
  return instance.put("/billing-java/service-parameter-types", data);
};

export const deleteServiceParameterType = (id) => {
  return instance.delete(`/billing-java/service-parameter-types/${id}`);
};
