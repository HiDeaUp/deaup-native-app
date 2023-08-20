import { FETCH_USER_QUERY_KEY, useSignOut } from "./user.service";
import { useQuery } from "react-query";
import { api } from "../helpers/api.helper";

import { useToken } from "../hooks/token.hook";
import { HouseQuery, HouseSearch } from "../types/house.type";

export const FETCH_HOUSES_QUERY_KEY = "fetchHouses";

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
