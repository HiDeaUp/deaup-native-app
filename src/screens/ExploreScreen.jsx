import React, { useState } from "react";
import { Box, FlatList } from "native-base";

import { useQueryClient } from "react-query";
import { useFetchHouses, FETCH_HOUSES_QUERY_KEY } from "../services/house";

export const ExploreScreen = () => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching } = useFetchHouses({ search, category });
  return (
    <Box h="100%" p={5} bg="white">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        px={5}
        flexGrow={1}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        refreshing={isLoading || isFetching}
        onRefresh={() => queryClient.refetchQueries([FETCH_HOUSES_QUERY_KEY])}
      />
    </Box>
  );
};
