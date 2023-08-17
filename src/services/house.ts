import { FETCH_USER_QUERY_KEY, useSignOut } from "./user.service";
import { useQuery } from "react-query";
import { api } from "../helpers/api.helper";

import { useToken } from "../hooks/token.hook";

interface HouseQuery {
  search: string;
  category: string;
}

export const FETCH_HOUSES_QUERY_KEY = "fetchHouses";

export const useFetchHouses = ({ search, category }: HouseQuery) => {
  const token = useToken();

  return useQuery(
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
};
