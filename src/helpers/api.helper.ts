import axios from "axios";
import { API_SERVER_URL } from "@env";

// make API requests easily with Axios
export const api = (() => axios.create({ baseURL: API_SERVER_URL }))();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    error.message =
      error.response?.data?.error ||
      (error.response?.data?.errors ? JSON.stringify(error.response?.data?.errors) : error.message);

    return Promise.reject(error);
  }
);
