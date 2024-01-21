export const ErrorHandler = (error) => {
  if (error.code === "ERR_NETWORK") throw new Error(error.message);
  if (error.code === "ECONNABORTED") throw new Error("Request Timeout");
  throw new Error(error.response.data.message);
};
