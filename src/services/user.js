import { useToast } from "native-base";
import { useMutation } from "react-query";

import { api } from "../handlers/axios.service";

export const useLogin = () => {
  const toast = useToast();

  return (
    useMutation(
      (email, password) =>
        api.post("/users/sign_in.json", { user: { email, password } }),
      { user: { email, password } }
    ),
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

export const useRegister = () => {
    const toast = useToast();
  
    return (
      useMutation(
        (email, password) =>
          api.post("/users.json", { user: { email, password } }),
        { user: { email, password } }
      ),
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
  