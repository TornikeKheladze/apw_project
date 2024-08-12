import { instance } from "./axios";

export const getBillingPackages = () => {
  return instance.get("/billing-java/packages");
};

export const createBillingPackage = (data) => {
  return instance.post("/billing-java/packages", data);
};

export const getBillingPackageById = (id) => {
  return instance.get(`/billing-java/packages/${id}`);
};

export const updateBillingPackage = (data) => {
  return instance.put("/billing-java/packages", data);
};

export const deleteBillingPackage = (id) => {
  return instance.delete(`/billing-java/packages/${id}`);
};

export const getBillingPackagesProduction = () => {
  return instance.get("/billing-java/packages-production");
};

export const createBillingPackageProduction = (data) => {
  return instance.post("/billing-java/packages-production", data);
};

export const getBillingPackageProductionById = (id) => {
  return instance.get(`/billing-java/packages-production/${id}`);
};

export const updateBillingPackageProduction = (data) => {
  return instance.put("/billing-java/packages-production", data);
};

export const deleteBillingPackageProduction = (id) => {
  return instance.delete(`/billing-java/packages-production/${id}`);
};

export const createInvoice = (data) => {
  return instance.post("/billing-java/invoice", data);
};

export const createInvoiceDetails = (data) => {
  return instance.post("/billing-java/invoice/details", data);
};

export const getInvoiceByNumber = (invoiceNumber) => {
  return instance.get(`/billing-java/invoice/${invoiceNumber}`);
};

export const getInvoices = (data = { page: 1, size: 50 }) => {
  return instance.get(`/billing-java/invoice/${data.page}/${data.size}`);
};
