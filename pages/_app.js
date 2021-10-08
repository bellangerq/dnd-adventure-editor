import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/print.css";
import customTheme from "../utils/theme";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DnD Adventure Editor</title>
      </Head>

      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default App;
