import { api, apiException } from "./axios";

export type GetUserCountResponse = {
  count: number;
};

export const getUserCount = async () => {
  try {
    return await api.get<GetUserCountResponse>("/users/count");
  } catch (error: any) {
    throw apiException(error);
  }
};
