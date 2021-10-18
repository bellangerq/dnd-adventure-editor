import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const primaryColor = 'purple'

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: true,
    },
    fonts: {
      print: '"Libre Baskerville", serif',
    },
    components: {
      Link: {
        baseStyle: ({ colorMode }) => ({
          color:
            colorMode === 'dark'
              ? `${primaryColor}.300`
              : `${primaryColor}.600`,
          textDecoration: 'underline',
        }),
      },
    },
  },
  withDefaultColorScheme({ colorScheme: primaryColor })
)

export default theme
