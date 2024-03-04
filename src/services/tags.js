import { buildRequest } from "./axios";

// our tags
export const getOurTags = async () => {
  return await buildRequest("get", "our-tags", 3);
};

export const addOurTag = async (data) => {
  return await buildRequest("post", "our-tags", 3, data);
};

export const editOurTag = async (data, id) => {
  return await buildRequest("put", `our-tags/${id}`, 3, data);
};

export const deleteOurTag = async (id) => {
  return await buildRequest("delete", `our-tags/${id}`, 3);
};

// owner tags
export const getOwnerTags = async () => {
  return await buildRequest("get", "owner-tags", 3);
};

export const addOwnerTag = async (data) => {
  return await buildRequest("post", "owner-tags", 3, data);
};

export const editOwnerTag = async (data, id) => {
  return await buildRequest("put", `owner-tags/${id}`, 3, data);
};

export const deleteOwnerTag = async (id) => {
  return await buildRequest("delete", `owner-tags/${id}`, 3);
};

// agent Tags
export const getAgentTags = async () => {
  return await buildRequest("get", "agent-tags", 3);
};

export const addAgentTag = async (data) => {
  return await buildRequest("post", "agent-tags", 3, data);
};

export const editAgentTag = async (data, id) => {
  return await buildRequest("put", `agent-tags/${id}`, 3, data);
};

export const deleteAgentTag = async (id) => {
  return await buildRequest("delete", `agent-tags/${id}`, 3);
};
