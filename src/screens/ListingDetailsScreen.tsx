import React from "react";
import {
  Box,
  Flex,
  Text,
  AspectRatio,
  Image,
  ScrollView,
  VStack,
  HStack,
  Heading,
  Divider,
  Button,
  Icon
} from "native-base";
import { Entypo } from "@expo/vector-icons";

import { House } from "../types/house.type";
import { formatPrice } from "../helpers/price.helper";
import { BackChevronIcon } from "../components/BackChevronIcon";
import { stringWidth } from "../helpers/text.helper";

interface ListingDetailsScreenProps {
  route: any;
  navigation: any;
}

export const ListingDetailsScreen = ({
  route,
  navigation,
}: ListingDetailsScreenProps) => {
  const { image, category, title, price, bathroom, bedroom, car, address, description } = route.params
    .details as House;

  return (
    <Flex height="100%" bg="white">
      <Box>
        <AspectRatio ratio={7 / 6}>
          <Image source={{ uri: image }} alt={`${title}`} />
        </AspectRatio>

        <Flex
          px={5}
          py={2}
          position="absolute"
          top={0}
          left={0}
          right={0}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          safeArea
        >
          <BackChevronIcon navigation={navigation} />

          <Box rounded="md" bg="rose.600:alpha.60" px={4} py={2}>
            <Text fontSize="md" color="white" bold>
              {category}
            </Text>
          </Box>
        </Flex>
      </Box>

      <ScrollView flexGrow={1}>
        <VStack px={5} py={8} space={2}>
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading fontSize="2xl">
              {stringWidth({ value: title, maxShownLength: 26 })}
            </Heading>
            <Text fontSize="xl" color="rose.500" bold>
              {formatPrice(price)}
            </Text>
          </Flex>

          <HStack mt={5} bg="indigo.50" rounded="2xl" p={2}>
            <VStack flex={1} alignItems="center">
              <Text fontSize="md">Bedroom</Text>
              <HStack space={2} alignItems="center">
                <Text fontSize="lg" bold>
                  {bedroom}
                </Text>
              </HStack>
            </VStack>

            <Divider orientation="vertical" mx={3} />

            <VStack flex={1} alignItems="center">
              <Text fontSize="md">Bathroom</Text>
              <HStack space={2} alignItems="center">
                <Text fontSize="lg" bold>
                  {bathroom}
                </Text>
              </HStack>
            </VStack>

            <Divider orientation="vertical" mx={3} />

            <VStack flex={1} alignItems="center">
              <Text fontSize="md">Carpark</Text>
              <HStack space={2} alignItems="center">
                <Text fontSize="lg" bold>
                  {car}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <Heading fontSize="lg" mt={10}>
            Location
          </Heading>
          <HStack alignItems="center" space={2}>
            <Icon as={Entypo} name="address" color="black" size={5} />
            <Text fontSize="md" color="light.600">{address}</Text>
          </HStack>

          <Heading fontSize="lg" mt={10}>
            Description
          </Heading>

          <Text mt={2} fontSize="md" color="light.600">
            {description}
          </Text>
        </VStack>
      </ScrollView>

      <Button m={5} _text={{ fontWeight: "bold", textTransform: "uppercase" }}>
        Get It Touch
      </Button>
    </Flex>
);
};
