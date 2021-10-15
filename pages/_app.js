import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/print.css'
import customTheme from '../utils/theme'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>D&D Adventure Editor</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
