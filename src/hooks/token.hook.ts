import { useQuery } from "react-query";
import * as SecureStorage from "expo-secure-store";

export const TOKEN_QUERY_KEY = "token";

export const useToken = (): string | null | undefined => {
  const { data: token } = useQuery(TOKEN_QUERY_KEY, () => SecureStorage.getItemAsync(TOKEN_QUERY_KEY), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return token;
};
