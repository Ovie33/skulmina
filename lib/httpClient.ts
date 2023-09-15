import axios, { isAxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use(function (config) {
  if (undefined !== window && window.localStorage) {
    const token = JSON.parse(window.localStorage.getItem("token") as string);
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const handleValidationError = (
  err: unknown,
  setError: UseFormSetError<any>
) => {
  if (isAxiosError(err) && err.response?.status === 422) {
    Object.keys(err.response.data.errors).forEach((key) => {
      setError(key, {
        message: err?.response?.data.errors[key][0] as string,
      });
    });
  }
};

export default httpClient;
