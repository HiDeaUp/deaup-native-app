import React from "react";
import AppNavigation from "./AppNavigation";
import { NativeBaseProvider, extendTheme } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient: QueryClient = new QueryClient();

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
          _focus: {
            borderWith: 1,
            borderColor: "darkBlue.50",
            bg: "white"
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <AppNavigation />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
