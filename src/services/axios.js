import axios from "axios";

export const instance = axios.create({
  // baseURL: "https://gda-authorisation.apw.ge/api/",
  baseURL: "https://test-dga-authorisation.apw.ge/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// temporary AID=3
export const buildRequest = (method, params, aid = 3, data) => {
  if (method === "get" || method === "delete") {
    return instance[method](
      `/pay/${method}/${btoa(`api/${params}`)}?aid=${aid}`
    );
  } else if (method === "post" || method === "put") {
    return instance[method](
      `/pay/${method}/${btoa(`api/${params}`)}?aid=${aid}`,
      data
    );
  }
};

export const billingInstance = axios.create({
  baseURL: "https://billing-back.apw.ge/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
