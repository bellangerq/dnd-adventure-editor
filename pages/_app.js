import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/print.css'
import customTheme from '../utils/theme'
import { useEffect } from 'react'

function App({ Component, pageProps }) {
  useEffect(() => {
    const doPrintEl = document.querySelector('.do-print')
    const ancestors = []

    let el = doPrintEl
    while (true) {
      el = el.parentElement
      if (!el) {
        break
      }
      ancestors.push(el)
      el.classList.add('do-print-ancestor')
    }
  }, [])
  return (
    <>
      <Head>
        <title>DnD Adventure Editor</title>
      </Head>

      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
