import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8800/todolist"
      : "",
  timeout: 50000,
  withCredentials: true,
});
