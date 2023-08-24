import { Icon, IconButton } from "native-base";

import { Ionicons } from "@expo/vector-icons";

const defaultBackground = "rose.600:alpha.60";

interface BackChevronIconProps {
  navigation: any;
  background: string;
}

export const BackChevronIcon = ({ navigation, background }: BackChevronIconProps) => {
  return (
    <IconButton
      variant="solid"
      bg={background || defaultBackground}
      icon={<Icon as={Ionicons} name="chevron-back" color="white" />}
      onPress={() => navigation.goBack()}
    />
  );
};
