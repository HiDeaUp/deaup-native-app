import axios from "axios";
import { API_SERVER_URL } from "@env";

export const baseURL = API_SERVER_URL;

// make API requests easily with Axios
export const api = (() => axios.create({ baseURL }))();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    error.message =
      error.response?.data?.error ||
      (error.response?.data?.errors ? JSON.stringify(error.response?.data?.errors) : error.message);

    return Promise.reject(error);
  }
);
