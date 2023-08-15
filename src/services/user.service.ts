import { useToast } from "native-base";
import { useMutation } from "react-query";

import { api } from "../helpers/axios.helper";
import { Payload } from "../types/user.type";

export const useSignIn = () => {
  const toast = useToast();

  return useMutation(
    ({ email, password }: Payload) => {
      const payload = { user: { email, password } };

      return api.post("/users/sign_in.json", payload);
    },
    {
      onSuccess: ({ data }) => {
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

  return useMutation(
    ({ email, password }: Payload) => {
      const payload = { user: { email, password } };

      return api.post("/users.json", payload);
    },
    {
      onSuccess: ({ data }) => {
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
