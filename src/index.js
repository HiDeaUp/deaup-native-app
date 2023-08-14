import React from "react";
import AppNavigation from "./AppNavigation";
import { NativeBaseProvider } from "native-base";

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: "rose",
        size: "lg",
      },
      Input: {
        defaultProps: {
          size: "lg",
          bg: "white",
          p: "3",
          borderWith: 0,
          _focus: { borderWith: 1, borderColor: "rose.400" },
        },
      },
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
    <AppNavigation />
    </NativeBaseProvider>
  );
}
