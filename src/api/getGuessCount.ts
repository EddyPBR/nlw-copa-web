import { api, apiException } from "./axios";

export type GetGuessCountResponse = {
  count: number;
};

export const getGuessCount = async () => {
  try {
    return await api.get<GetGuessCountResponse>("/guesses/count");
  } catch (error: any) {
    throw apiException(error);
  }
};
