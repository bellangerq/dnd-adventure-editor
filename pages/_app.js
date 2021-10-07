import Head from 'next/head'

import '../styles/globals.css'
import '../styles/print.css'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DnD Adventure Editor</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
