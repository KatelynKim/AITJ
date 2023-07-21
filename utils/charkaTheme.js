// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        default: {
          bg: '#a8dadc',
        },
        delete: {
          bg: '#e07a5f',
        },
      },
      defaultProps: {
        variant: 'default',
      },
    },
  },
})

export default theme
