import { Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import PostContent from './PostContent'
import Poll from './Poll'

const Post = ({ postData, editorState }) => {
  console.log('postDatA:', postData)

  return (
    <Flex gap={10}>
      <PostContent postData={postData} editorState={editorState} />
      <Poll />
    </Flex>
  )
}

export default Post
