import React from "react";
import { Box, Pressable, Image, AspectRatio } from "native-base";

import { House } from "../types/house.type";

interface HouseCardProps {
  item: House;
  onPress: () => void;
}

export const HouseCard = ({ item, onPress }: HouseCardProps) => {
  return (
    <Pressable onPress={onPress} shadow={5}>
      <Box bg="white" mt={5} rounded="xl" overflow="hidden">
        <AspectRatio ratio={2 / 1}>
          <Image source={{ uri: item?.image }} alt={`${item?.title}`} />
        </AspectRatio>
      </Box>
    </Pressable>
  );
};
