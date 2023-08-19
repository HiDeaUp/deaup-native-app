import { Heading, VStack } from "native-base";

import { AppIcon } from "../components/AppIcon";

export const AppLogo = () => {
  return (
    <VStack space={2} mb={20} alignSelf="center">
    <AppIcon />

    <Heading size="3xl" mr={2} color="rose.600">
      Secret Estate
    </Heading>
  </VStack>
  );
};
