import React, { useState } from "react";
import { ScrollView, Box, Image, Flex, VStack, Input, Button, Text, TextArea } from "native-base";

import { House } from "../types/house.type";
import { BackChevronIcon } from "../components/BackChevronIcon";

interface ListingFormScreenProps {
  route: any;
  navigation: any;
}

export const ListingFormScreen = ({ route, navigation }: ListingFormScreenProps) => {
  const item = route.params?.details as House;

  const [title, setTitle] = useState(item?.title);
  const [description, setDescription] = useState(item?.description);

  return (
    <Flex height="100%">
      <Flex
        px={5}
        top={0}
        left={0}
        right={0}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        safeArea
      >
        <BackChevronIcon navigation={navigation} background="rose.600" />
      </Flex>

      <ScrollView flexGrow={1}>
        <VStack space={2} p={5}>
          <Text bold fontSize="md">
            Title
          </Text>

          <Input value={title} onChangeText={setTitle} />

          <Text mt={5} bold fontSize="md">
            Description
          </Text>
          <TextArea
            h={20}
            placeholder="A beautiful house..."
            value={description}
            onChangeText={setDescription}
            autoCompleteType={true}
            rounded={5}
          />
        </VStack>
      </ScrollView>

      <Button m={5} _text={{ textTransform: "uppercase" }}>
        {item ? "Update" : "Create"}
      </Button>
    </Flex>
  );
};
