import { useToast } from "native-base";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";

import { api } from "../helpers/axios.helper";
import { Payload } from "../types/user.type";
import * as SecureStore from "expo-secure-store";

import { useToken, TOKEN_QUERY_KEY } from "../hooks/token.hook";

export const FETCH_USER_QUERY_KEY = "fetchUser";

enum UserFormMessage {
  SUCCESS_SIGNUP_MSG = "Successfully Signed Up! 😎",
  SUCCESS_SIGNIN_MSG = "Welcome back! 😊",
  ERROR_MSG = "An error has occurred",
}

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
        await _persistHeadersToken(data, queryClient);

        toast.show({
          title: data
            ? UserFormMessage.SUCCESS_SIGNIN_MSG
            : UserFormMessage.ERROR_MSG,
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
      onSuccess: async (data) => {
        await _persistHeadersToken(data, queryClient);

        toast.show({
          title: data
            ? UserFormMessage.SUCCESS_SIGNUP_MSG
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

const _persistHeadersToken = async (data: any, queryClient: QueryClient): Promise<void> => {
  const {
    headers: { authorization: token },
  } = data;

  await SecureStore.setItemAsync(TOKEN_QUERY_KEY, token);

  // invalidate the following token queries
  queryClient.invalidateQueries([TOKEN_QUERY_KEY]);
  queryClient.invalidateQueries([FETCH_USER_QUERY_KEY]);
};
