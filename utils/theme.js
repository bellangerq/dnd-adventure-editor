import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: true,
    },
    fonts: {
      print: '"Libre Baskerville", serif',
    },
  },
  withDefaultColorScheme({ colorScheme: 'pink' })
)

export default theme
