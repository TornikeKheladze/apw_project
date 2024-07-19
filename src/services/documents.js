import { instance } from "./axios";

// Get all categories
export const getAllCatalogs = () => {
  return instance.get(`document/catalog`);
};

// Get a category by ID
export const getDocCategoryById = (id) => {
  return instance.get(`document/catalog/${id}`);
};

// Create a new category
export const createCatalog = (data) => {
  return instance.post(`document/catalog`, data);
};

// Update a category
export const updateCategory = (data) => {
  return instance.put(`document/catalog/${data.id}`, data);
};

// Delete a category
export const deleteCategory = (id) => {
  return instance.delete(`document/catalog/${id}`);
};

// Get all templates
export const getAllTemplates = () => {
  return instance.get(`document/templates`);
};

// Get a template by ID
export const getTemplateById = (id) => {
  return instance.get(`document/templates/${id}`);
};

// Create a new template
export const createTemplate = (data) => {
  return instance.post(`document/templates`, data);
};

// Update a template
export const updateTemplate = (data) => {
  return instance.put(`document/templates/${data.id}`, data);
};

// Delete a template
export const deleteTemplate = (id) => {
  return instance.delete(`document/templates/${id}`);
};

// Get all template columns by template ID
export const getAllTemplateColumns = () => {
  return instance.get(`document/template_columns`);
};

// Get all template columns by template ID
export const getTemplateColumnsByTemplateId = (templateId) => {
  return instance.get(`document/template_columns/by_template_id/${templateId}`);
};

// Create a new template column
export const createTemplateColumn = (data) => {
  return instance.post(`document/template_columns`, data);
};

// Update a template column
export const updateTemplateColumn = (data) => {
  return instance.put(`document/template_columns/${data.id}`, data);
};

// Delete a template column
export const deleteTemplateColumn = (id) => {
  return instance.delete(`document/template_columns/${id}`);
};

export const getAllTemplateColumnsType = () => {
  return instance.get(`document/template-columns-type`);
};

// Get all documents
export const getAllDocuments = () => {
  return instance.get(`document/documents`);
};

// Get a document by ID
export const getDocumentById = (id) => {
  return instance.get(`document/documents/${id}`);
};

// Create a new document
export const createDocument = (data) => {
  return instance.post(`document/documents`, data);
};

// Update a document
export const updateDocument = (data) => {
  return instance.put(`document/documents/${data.id}`, data);
};

// Delete a document
export const deleteDocument = (id) => {
  return instance.delete(`document/documents/${id}`);
};

// Generate a document
export const generateDocument = (data) => {
  return instance.post(`document/io`, data);
};

// Get all catalog types
export const getAllCatalogTypes = () => {
  return instance.get(`document/catalog-type`);
};

export const signDocument = (data) => {
  return instance.post("document/doc-file/html-tu-pdf", data);
};

export const downloadSignedDocument = (id) => {
  return instance.get(`document/doc-file/html-tu-pdf-download/${id}`);
};

export const getAmountByWord = (amount) => {
  return instance.get(`document/io/money-word/${amount}`);
};

export const createUserInvoiceDoc = (data) => {
  return instance.post("/document/doc-file/invoice-template", data);
};

export const getDocumentByUUID = (uuid) => {
  return instance.post(`document/documents/uuid`, { uuid });
};

// https://test-dga-authorisation.apw.ge/api/document/doc-file/html-tu-pdf-download/662a57c16982aa213dba530a
