import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Editor } from 'draft-js'
import React from 'react'
import BorderedBox from './BorderedBox'
import Image from 'next/image'

const PostContent = ({ postData, editorState }) => {
  const {
    title,
    username,
    content,
    upVoteCount,
    downVoteCount,
    options,
    viewCount,
    votingLength,
    createdAt,
  } = postData

  const createdDate = new Date(createdAt)
  const createdDateConverted = createdDate.toLocaleString()
  return (
    <BorderedBox padding={16} width={'70%'}>
      <Text>
        {' '}
        Posted by {username} on {createdDateConverted}{' '}
      </Text>
      <Heading> {title} </Heading>
      <Divider marginY={4} />
      <Editor editorState={editorState} readOnly />
      <Divider marginY={4} />
      <Flex justifyContent={'center'} marginY={5}>
        <HStack gap={6}>
          {options.map((option) => (
            <Button key={option.name}> {option.name} </Button>
          ))}
        </HStack>
      </Flex>

      <HStack justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          paddingTop={3}
          borderRadius={1000}
          w={'80px'}
          h={'80px'}
          border={'3px solid black'}
        >
          <Image src="/dislike.png" width={40} height={40} alt="Dislike post" />
        </Box>
        <Text fontSize={25}> {downVoteCount}</Text>
        <Text fontSize={25}> {downVoteCount}</Text>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={1000}
          w={'80px'}
          h={'80px'}
          border={'3px solid black'}
        >
          <Image src="/like.png" width={40} height={40} alt="Like post" />
        </Box>
      </HStack>

      <Divider marginY={4} />
      <Textarea placeholder="Leave a comment" />
      <Button> Comment </Button>
    </BorderedBox>
  )
}

export default PostContent
