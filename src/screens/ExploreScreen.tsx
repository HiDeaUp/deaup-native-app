import React, { useState } from "react";
import { Box, FlatList, VStack, Input, Select, Icon } from "native-base";
import { useQueryClient } from "react-query";
import { AntDesign } from "@expo/vector-icons";
import { ListRenderItemInfo } from "react-native";

import { useFetchHouses, FETCH_HOUSES_QUERY_KEY } from "../services/house";
import { ListingCard } from "../components/ListingCard";
import { House } from "../types/house.type";

export const ExploreScreen = ({ navigation }: any) => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching } = useFetchHouses({ search, category });

  return (
    <Box h="100%">
      <VStack p={5} space={4}>
        <Input
          p={3}
          value={search}
          onChangeText={setSearch}
          size="xl"
          placeholder="Search"
          InputLeftElement={
            <Icon
              as={AntDesign}
              name="search1"
              size={4}
              color="gray.500"
              ml={3}
            />
          }
        />
        <Select
          p={3}
          mt={1}
          placeholder="Select a category"
          accessibilityLabel="Select a category"
          selectedValue={category}
          onValueChange={setCategory}
        >
          <Select.Item label="ALL" value="" />
          <Select.Item label="Apartment" value="apartment" />
          <Select.Item label="Detached House" value="detached" />
          <Select.Item label="Penthouse" value="penthouse" />
        </Select>
      </VStack>
      <FlatList
        data={data}
        keyExtractor={(item: House): any => item.id}
        px={5}
        flexGrow={1}
        // below, show item to the ListingCard image component
        renderItem={({
          item,
        }: ListRenderItemInfo<House>): React.JSX.Element => (
          <ListingCard
            item={item}
            onPress={() => navigation.navigate("Details", { details: item })}
          />
        )}
        refreshing={isLoading || isFetching}
        onRefresh={() => queryClient.refetchQueries([FETCH_HOUSES_QUERY_KEY])}
      />
    </Box>
  );
};
