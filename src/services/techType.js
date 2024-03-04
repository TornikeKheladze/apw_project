import { buildRequest } from "./axios";

export const getTechTypes = async () => {
  const response = await buildRequest("get", "tech-types", 3);
  return response;
};
