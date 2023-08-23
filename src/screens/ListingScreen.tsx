import React from "react";
import { Box, FlatList, Fab, VStack, Icon, Text } from "native-base";
import { useQueryClient } from "react-query";
import { AntDesign } from "@expo/vector-icons";

import { useFetchOwnHouses, FETCH_OWN_HOUSES_QUERY_KEY } from "../services/house.service";
import { ListingCard } from "../components/ListingCard";
import { House } from "../types/house.type";
import { ScreenName } from "../types/navigation.constant";

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
          <ListingCard item={item} onPress={() => navigation.navigate(ScreenName.LISTING_FORM, { details: item })} />
        )}
        refreshing={isLoading || isFetching}
        onRefresh={() => queryClient.refetchQueries([FETCH_OWN_HOUSES_QUERY_KEY])}
        ListEmptyComponent={
          <VStack alignItems="center" mt={50} space={2}>
            <Icon as={AntDesign} name="inbox" size={24} color="gray.400" />
            <Text color="gray.400">No entries yet. Fancy to create your first listing?</Text>
          </VStack>
        }
      />

      <Fab
        colorScheme="rose"
        renderInPortal={false}
        shadow={2}
        icon={
          <Icon
            as={AntDesign}
            color="white"
            name="plus"
            size={8}
            onPress={() => navigation.navigate(ScreenName.LISTING_FORM)}
          />
        }
      />
    </Box>
  );
};
