import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/print.css'
import customTheme from '../utils/theme'

function App({ Component, pageProps }) {
  const title = 'D&D Adventure Editor'
  const description = 'Generate beautiful and print-ready D&D adventures.'
  const ogImage = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/og.jpg`
    : 'http://localhost:3000/og.jpg'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="og:title" property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta
          name="og:description"
          property="og:description"
          content={description}
        />
        <meta name="og:image" property="og:image" content={ogImage} />
      </Head>

      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
