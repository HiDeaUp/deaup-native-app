import { useToast } from "native-base";
import { useMutation } from "react-query";

import { api } from "../helpers/axios.service";

export const useLogin = () => {
  const toast = useToast();

  return (
    useMutation((email, password) => {
      const payload = { user: { email, password } };
      api.post("/users/sign_in.json", payload), payload;
    }),
    {
      onSuccess: (data) => {
        toast.show({
          title: data?.data
            ? JSON.stringify(data?.data)
            : "An error has occurred",
        });
      },
      onError: (error) => {
        toast.show({ title: error.message });
      },
    }
  );
};

export const useSignUp = () => {
  const toast = useToast();

  return (
    useMutation((email, password) => {
      const payload = { user: { email, password } };

      api.post("/users.json", payload), payload;
    }),
    {
      onSuccess: (data) => {
        toast.show({
          title: data?.data
            ? JSON.stringify(data?.data)
            : "An error has occurred",
        });
      },
      onError: (error) => {
        toast.show({ title: error.message });
      },
    }
  );
};
