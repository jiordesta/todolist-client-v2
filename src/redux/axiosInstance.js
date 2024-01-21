import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://todolist-webapp-api.onrender.com/todolist",
  timeout: 50000,
  withCredentials: true,
});
