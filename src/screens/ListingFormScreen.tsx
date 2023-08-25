import React, { useState } from "react";
import { ScrollView, Flex, VStack, Input, Button, Text, Select, TextArea } from "native-base";

import { House, HouseListingForm, CreateHousePayload, UpdateHousePayload } from "../types/house.type";
import { BackChevronIcon } from "../components/BackChevronIcon";
import { useCreateHouse, useUpdateHouse } from "../services/house.service";

interface ListingFormScreenProps {
  route: any;
  navigation: any;
}

export const ListingFormScreen = ({ route, navigation }: ListingFormScreenProps) => {
  const item = route.params?.details as House;

  const [title, setTitle] = useState(item?.title);
  const [description, setDescription] = useState(item?.description);

  const [category, setCategory] = useState(item?.category || HouseListingForm.DEFAULT_CATEGORY);
  const [address, setAddress] = useState(item?.address);
  const [price, setPrice] = useState(item?.price?.toString());
  const [bedroom, setBedroom] = useState(item?.bedroom?.toString());
  const [bathroom, setBathroom] = useState(item?.bathroom?.toString());
  const [car, setCar] = useState(item?.car?.toString());
  const [image, setImage] = useState(item?.image);

  const updateItemMutation = useUpdateHouse({
    onSuccess: () => navigation.goBack(),
  });

  const createItemMutation = useCreateHouse({
    onSuccess: () => navigation.goBack(),
  });

  const onCreate = () => {
    const createPayload: CreateHousePayload = {
      title,
      description,
      category,
      address,
      price: parseInt(price),
      bedroom: parseInt(bedroom),
      bathroom: parseInt(bathroom),
      car: parseInt(car),
      image,
    };

    createItemMutation.mutate(createPayload);
  };

  const onUpdate = () => {
    const updatePayload: UpdateHousePayload = {
      id: item.id,
      house: {
        title,
        description,
        category,
        address,
        price: parseInt(price),
        bedroom: parseInt(bedroom),
        bathroom: parseInt(bathroom),
        car: parseInt(car),
        image,
      },
    };

    updateItemMutation.mutate(updatePayload);
  };

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
        <BackChevronIcon navigation={navigation} background="rose.500" />
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

          <Text bold fontSize="md">
            Category
          </Text>
          <Select
            placeholder="Select a category"
            accessibilityLabel="Select a category"
            selectedValue={category}
            onValueChange={setCategory}
          >
            <Select.Item label="Apartment" value="apartment" />
            <Select.Item label="Detached House" value="detached" />
            <Select.Item label="Penthouse" value="penthouse" />
          </Select>

          <Text bold fontSize="md">
            Address
          </Text>
          <Input value={address} onChangeText={setAddress} />

          <Text bold fontSize="md">
            Image link (URL)
          </Text>
          <Input value={image} onChangeText={setImage} />

          <Text bold fontSize="md">
            Price
          </Text>
          <Input keyboardType="numeric" value={price} onChangeText={setPrice} />

          <Text bold fontSize="md">
            Bedroom
          </Text>
          <Input keyboardType="numeric" value={bedroom} onChangeText={setBedroom} />

          <Text bold fontSize="md">
            Bathroom
          </Text>
          <Input keyboardType="numeric" value={bathroom} onChangeText={setBathroom} />

          <Text bold fontSize="md">
            Cars
          </Text>
          <Input keyboardType="numeric" value={car} onChangeText={setCar} />
        </VStack>
      </ScrollView>

      <Button
        m={5}
        _text={{ textTransform: "uppercase" }}
        onPress={item ? onUpdate : onCreate}
        isLoading={updateItemMutation.isLoading}
      >
        {item ? "Update" : "Create"}
      </Button>
    </Flex>
  );
};
