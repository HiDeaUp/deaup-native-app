import { useToast } from "native-base";
import { useMutation, useQueryClient } from "react-query";

import { api } from "../helpers/axios.helper";
import { Payload } from "../types/user.type";
import * as SecureStore from "expo-secure-store";

export const FETCH_USER_QUERY_KEY = "fetchUser";
const TOKEN_QUERY_KEY = "token";

export const useSignIn = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ email, password }: Payload) => {
      const payload = { user: { email, password } };

      return api.post("/users/sign_in.json", payload);
    },
    {
      onSuccess: async ({ data }) => {
        const token = data.headers.authorization;
        await SecureStore.setItemAsync(TOKEN_QUERY_KEY, token);

        // invalidate the following token queries
        queryClient.invalidateQueries([TOKEN_QUERY_KEY]);
        queryClient.invalidateQueries([FETCH_USER_QUERY_KEY]);

        toast.show({
          title: data ? JSON.stringify(data) : "An error has occurred",
        });
      },
      onError: ({ message }) => {
        toast.show({ title: message });
      },
    }
  );
};

export const useSignUp = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ email, password }: Payload) => {
      const payload = { user: { email, password } };

      return api.post("/users.json", payload);
    },
    {
      onSuccess: async ({ data }) => {
        const token = data.headers.authorization;
        await SecureStore.setItemAsync(TOKEN_QUERY_KEY, token);

        
        // invalidate the following token queries
        queryClient.invalidateQueries([TOKEN_QUERY_KEY]);
        queryClient.invalidateQueries([FETCH_USER_QUERY_KEY]);

        toast.show({
          title: data ? JSON.stringify(data) : "An error has occurred",
        });
      },
      onError: ({ message }) => {
        toast.show({ title: message });
      },
    }
  );
};
