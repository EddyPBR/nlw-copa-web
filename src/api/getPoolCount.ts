import { api, apiException } from "./axios";

export type GetPoolCountResponse = {
  count: number;
};

export const getPoolCount = async () => {
  try {
    return await api.get<GetPoolCountResponse>("/pools/count");
  } catch (error: any) {
    throw apiException(error);
  }
};
