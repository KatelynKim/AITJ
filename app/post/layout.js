'use client'
import { Box, HStack, VStack, Flex } from '@chakra-ui/react'
import Placeholder from 'components/Placeholder'

export default function PostCreationLayout({ children }) {
  return (
    <Flex w="100%" justifyContent="space-between" gap={20}>
      <Box flexGrow={1}>{children}</Box>
      <Placeholder />
    </Flex>
  )
}
