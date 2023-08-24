import React, { useState } from "react";
import { ScrollView, Flex, VStack, Input, Button, Text, TextArea } from "native-base";

import { House } from "../types/house.type";

interface ListingFormScreenProps {
  route: any;
}

export const ListingFormScreen = ({ route }: ListingFormScreenProps) => {
  const item = route.params?.details as House;

  const [title, setTitle] = useState(item?.title);
  const [description, setDescription] = useState(item?.description);

  return (
    <Flex height="100%">
      <ScrollView flexGrow={1}>
        <VStack space={2} p={5}>
          <Text mt={5} bold fontSize="md">
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
