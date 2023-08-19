import React from "react";
import { AppNavigation } from "./AppNavigation";
import { NativeBaseProvider, extendTheme } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient: QueryClient = new QueryClient();

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: "rose",
        size: "lg",
        rounded: "3xl",
      },
    },
    Input: {
      defaultProps: {
        size: "lg",
        bg: "white",
        p: "3",
        rounded: "xl",
        fontSize: "lg",
        borderWidth: 0,
        _focus: { borderWidth: 1, borderColor: "rose.400", bg: "white" },
      },
    },
    Select: {
      defaultProps: {
        rounded: "lg",
        size: "xl",
        bg: "white",
      },
    },
    IconButton: {
      defaultProps: {
        rounded: "md",
        colorScheme: "rose.600",
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
