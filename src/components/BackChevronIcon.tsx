import { Icon, IconButton } from "native-base";

import { Ionicons } from "@expo/vector-icons";

const defaultBackground = "rose.600:alpha.60";

export const BackChevronIcon = ({ navigation }: any, background: string = defaultBackground) => {
  return (
    <IconButton
      variant="solid"
      bg={background}
      icon={<Icon as={Ionicons} name="chevron-back" color="white" />}
      onPress={() => navigation.goBack()}
    />
  );
};
