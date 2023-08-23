import React from "react";
import { Box, FlatList, Fab, VStack, Icon, Text } from "native-base";
import { useQueryClient } from "react-query";
import { AntDesign } from "@expo/vector-icons";

import { useFetchOwnHouses, FETCH_OWN_HOUSES_QUERY_KEY } from "../services/house.service";
import { ListingCard } from "../components/ListingCard";
import { House } from "../types/house.type";

export const ListingScreen = ({ navigation }: any) => {
  const queryClient = useQueryClient();
  const { house, isLoading, isFetching } = useFetchOwnHouses();

  return (
    <Box h="100%">
      <FlatList
        data={house}
        keyExtractor={(item: House): any => item.id}
        p={5}
        flexGrow={1}
        renderItem={({ item }) => (
          <ListingCard item={item} onPress={() => navigation.navigate("Details Form", { details: item })} />
        )}
        refreshing={isLoading || isFetching}
        onRefresh={() => queryClient.refetchQueries([FETCH_OWN_HOUSES_QUERY_KEY])}
        ListEmptyComponent={
          <VStack alignItems="center" mt={50} space={2}>
            <Icon as={AntDesign} name="inbox" size={24} color="gray.400" />
            <Text color="gray.400">No item to display</Text>
          </VStack>
        }
      />

      <Fab
        colorScheme="rose"
        renderInPortal={false}
        shadow={2}
        icon={<Icon as={AntDesign} color="white" name="plus" size={24} />}
      />
    </Box>
  );
};
