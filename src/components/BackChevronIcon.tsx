import { Icon, IconButton } from "native-base";

import { Ionicons } from "@expo/vector-icons";

export const BackChevronIcon = ({ navigation }: any) => {
  return (
    <IconButton
      variant="solid"
      bg="rose.600:alpha.60"
      icon={<Icon as={Ionicons} name="chevron-back" color="white" />}
      onPress={() => navigation.goBack()}
    />
  );
};
