import { api, apiException } from "./axios";

export type CreatePoolBody = {
  title: string;
};

export type CreatePoolResponse = {
  code: string;
};

export const createPool = async (body: CreatePoolBody) => {
  try {
    return await api.post<CreatePoolResponse>("/pools", body);
  } catch (error: any) {
    throw apiException(error);
  }
};
