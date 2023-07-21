import { Box } from '@chakra-ui/react'
import React from 'react'

const BorderedBox = ({ children, ...rest }) => {
  return (
    <Box border={'1px solid #e5e5e5'} borderRadius={8} bg={'white'} {...rest}>
      {children}
    </Box>
  )
}

export default BorderedBox
