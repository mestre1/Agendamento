import axios from "axios";

const baseConfig = {
  baseURL: "http://jasonplaceholder.typicode.com/",
  headers: {
    Authorization: "Bearer {token}",
  },
};

export const axiosInstance = axios.create(baseConfig);
