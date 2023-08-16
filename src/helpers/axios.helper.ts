import axios from "axios";

export const baseURL = "http://127.0.0.1:3000";

export const api = (() => axios.create({ baseURL }))();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    error.message =
      error.response?.data?.error ||
      (error.response?.data?.errors
        ? JSON.stringify(error.response?.data?.errors)
        : error.message);

    return Promise.reject(error);
  }
);
