import { useQuery, useMutation, useQueryClient } from "react-query";
import { useToast } from "native-base";
import { api } from "../helpers/api.helper";

import { useToken } from "../hooks/token.hook";
import { HouseQuery, HouseSearch, CreateHousePayload, UpdateHousePayload } from "../types/house.type";

export const FETCH_HOUSES_QUERY_KEY = "fetchHouses";
export const FETCH_OWN_HOUSES_QUERY_KEY = "fetchOwnHouses";

export const useFetchHouses = ({ search, category }: HouseSearch): HouseQuery => {
  const token = useToken();

  const {
    data: house,
    isLoading,
    isFetching,
  } = useQuery(
    [FETCH_HOUSES_QUERY_KEY, token, search, category],
    () =>
      api.get(`/houses.json`, {
        headers: { authorization: token },
        params: { search, category },
      }),
    {
      select: (houseData) => houseData?.data,
    }
  );

  return {
    house,
    isLoading,
    isFetching,
  };
};

export const useFetchOwnHouses = (): HouseQuery => {
  const token = useToken();

  const {
    data: house,
    isLoading,
    isFetching,
  } = useQuery(
    [FETCH_OWN_HOUSES_QUERY_KEY, token, token],
    () =>
      api.get(`/houses/own.json`, {
        headers: { authorization: token },
      }),
    {
      select: (houseData) => houseData?.data,
    }
  );

  return {
    house,
    isLoading,
    isFetching,
  };
};

export const useCreateHouse = (options: any) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = useToken();

  return useMutation(
    (houseData: CreateHousePayload) =>
      api.post(`/houses.json`, houseData, {
        headers: { authorization: token },
      }),
    {
      onSuccess: () => {
        // invalid the fetch houses and fetch own houses queries
        queryClient.invalidateQueries(FETCH_HOUSES_QUERY_KEY);
        queryClient.invalidateQueries(FETCH_OWN_HOUSES_QUERY_KEY);

        toast.show({ title: "Hoorah! Created! 🎉" });

        options?.onSuccess();
      },
      onError: ({ message }) => {
        toast.show({ title: message });
      },
    }
  );
};

export const useUpdateHouse = (options: any) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const token = useToken();

  return useMutation(
    (houseData: UpdateHousePayload) =>
      api.patch(`/houses/${houseData.id}.json`, houseData?.house, {
        headers: { authorization: token },
      }),
    {
      onSuccess: () => {
        // invalid the fetch houses and fetch own houses queries
        queryClient.invalidateQueries(FETCH_HOUSES_QUERY_KEY);
        queryClient.invalidateQueries(FETCH_OWN_HOUSES_QUERY_KEY);

        toast.show({ title: "Updated successfully! 🎉" });

        options?.onSuccess();
      },
      onError: ({ message }) => {
        toast.show({ title: message });
      },
    }
  );
};
