import React from "react";
import { Box, Flex, Text, AspectRatio, Image } from "native-base";

import { House } from "../types/house.type";
import { BackChevronIcon } from "../components/BackChevronIcon";

interface ListingDetailsScreenProps {
  route: any;
  navigation: any;
}

export const ListingDetailsScreen = ({
  route,
  navigation,
}: ListingDetailsScreenProps) => {
  const { image, category } = route.params.house as House;

  return (
    <Flex height="100%">
      <Box>
        <AspectRatio ratio={7 / 6}>
          <Image source={{ uri: image }} />
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
    </Flex>
  );
};
