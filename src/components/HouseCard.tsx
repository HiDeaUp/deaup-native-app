import React from "react";
import {
  Box,
  Pressable,
  Image,
  AspectRatio,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
} from "native-base";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import { House } from "../types/house.type";
import { formatPrice } from "../helpers/price.helper";

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

        <Box
          rounded="2xl"
          bg="rose.500"
          px={3}
          py={1}
          position="absolute"
          top={2}
          right={2}
        >
          <Text fontSize="sm" color="white">
            {item.category}
          </Text>
        </Box>

        <VStack p={3} space={1}>
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading size="md" color="black" flexShrink={1}>
              {item.title}
            </Heading>
            <Text fontSize="lg" color="rose.500" bold>
              {formatPrice(item.price)}
            </Text>
          </Flex>
          <HStack alignItems="center" space={2}>
            <Icon as={Entypo} name="address" color="black" size={5} />
            <Text fontSize="md" color="light.400">
              {item.address}
            </Text>
          </HStack>
          <HStack pt={2} pr={2} space={8} alignSelf="flex-end">
            <HStack alignItems="center" space={1} justifyContent="center">
              <Icon as={FontAwesome5} name="bed" color="black" size={5} />
              <Text color="black" fontSize="md">
                {item.bedroom}
              </Text>
            </HStack>
            <HStack alignItems="center" space={1} justifyContent="center">
              <Icon as={FontAwesome5} name="bath" color="black" size={5} />
              <Text color="black" fontSize="md">
                {item.bathroom}
              </Text>
            </HStack>
            <HStack alignItems="center" space={1} justifyContent="center">
              <Icon as={FontAwesome5} name="car" color="black" size={5} />
              <Text color="black" fontSize="md">
                {item.car}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};
