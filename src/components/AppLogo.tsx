import { Heading, VStack } from "native-base";

import { AppIcon } from "./AppIcon";

interface AppLogoProps {
  name: string;
}

export const AppLogo = ({ name }: AppLogoProps) => {
  return (
    <VStack space={2} mb={20} alignSelf="center">
    <AppIcon />

    <Heading size="3xl" mr={2} color="rose.600">
      {name}
    </Heading>
  </VStack>
  );
};
