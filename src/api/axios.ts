import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

type ApiDefaultErrorResponse = {
  message?: string;
};

export const apiException = (error: any) => {
  if (!axios.isAxiosError(error)) {
    return {
      message: (error?.message ?? "Erro indefinido do cliente") as string,
      type: "node exception",
    };
  }

  const axiosError = error as AxiosError<ApiDefaultErrorResponse>;

  return {
    message: axiosError.response?.data?.message || "Ocorreu um erro inesperado",
    type: "api request exception",
  };
};
