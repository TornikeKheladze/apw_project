import { instance } from "./axios";

export const getPositionByDepartmentId = async (did) => {
  const response = await instance.get(`/user/positions/${did}`);
  return response;
};

export const addPosition = async (position_name, did) => {
  const response = await instance.post("/user/positions", {
    position_name,
    did,
  });
  return response;
};

export const deletePosition = async (id) => {
  const response = await instance.delete("/user/positions", {
    data: { id },
  });
  return response;
};

export const updatePosition = async (data) => {
  const response = await instance.put("/user/positions", data);
  return response;
};
