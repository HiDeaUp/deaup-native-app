import { useToast } from "native-base";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { api } from "../helpers/api.helper";
import { Payload } from "../types/user.type";
import * as SecureStore from "expo-secure-store";

import { useToken, TOKEN_QUERY_KEY } from "../hooks/token.hook";

export const FETCH_USER_QUERY_KEY = "fetchUser";

enum UserFormMessage {
  SUCCESS_SIGN_UP_MSG = "Successfully Signed Up! 😎",
  SUCCESS_SIGN_IN_MSG = "Welcome back! 😊",
  SUCCESS_SIGN_OUT_MSG = "See you soon! 👋",
  ERROR_MSG = "An error has occurred",
}

export const useSignUp = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ email, password }: Payload) => {
      const payload = { user: { email, password } };

      return api.post("/users.json", payload);
    },
    {
      onSuccess: async (data) => {
        const {
          headers: { authorization: token },
        } = data;

        await _persistTokenValue(queryClient, token);

        toast.show({
          title: data
            ? UserFormMessage.SUCCESS_SIGN_UP_MSG
            : UserFormMessage.ERROR_MSG,
        });
      },
      onError: ({ message }) => {
        toast.show({ title: message });
      },
    }
  );
};

export const useSignIn = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ({ email, password }: Payload) => {
      const payload = { user: { email, password } };

      return api.post("/users/sign_in.json", payload);
    },
    {
      onSuccess: async (data) => {
        const {
          headers: { authorization: token },
        } = data;

        await _persistTokenValue(queryClient, token);

        toast.show({
          title: data
            ? UserFormMessage.SUCCESS_SIGN_IN_MSG
            : UserFormMessage.ERROR_MSG,
        });
      },
      onError: ({ message }) => {
        toast.show({ title: message });
      },
    }
  );
};

export const useSignOut = () => {
  const toast = useToast();
  const token = useToken();
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      const headers = { authorization: token };

      return api.delete("/users/sign_out.json", null, { headers });
    },
    {
      onSuccess: async (data) => {
        await _persistTokenValue(queryClient, "");

        toast.show({
          title: data
            ? UserFormMessage.SUCCESS_SIGN_OUT_MSG
            : UserFormMessage.ERROR_MSG,
        });
      },
      onError: ({ message }) => {
        toast.show({ title: message });
      },
    }
  );
};

export const useFetchUser = () => {
  const token = useToken();
  const headers = { authorization: token };

  return useQuery(
    [FETCH_USER_QUERY_KEY, token],
    () => api.post("/users/sign_in.json", null, { headers }),
    {
      enabled: !!token, // cast to boolean
      staleTime: Infinity,
      cacheTime: Infinity,
      select: (userData: any) => userData?.data, // retrieve the data from the API
    }
  );
};

const _persistTokenValue = async (
  queryClient: QueryClient,
  value: string
): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_QUERY_KEY, value);

  // invalidate the following token queries
  queryClient.invalidateQueries([TOKEN_QUERY_KEY]);
  queryClient.invalidateQueries([FETCH_USER_QUERY_KEY]);
};
