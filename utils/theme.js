import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: true,
    },
  },
  withDefaultColorScheme({ colorScheme: "pink" })
);

export default theme;
