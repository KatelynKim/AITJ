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
import React, { useEffect, useState, useMemo } from 'react'
import BorderedBox from './BorderedBox'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { sendDeleteRequest, sendGetRequest, sendPatchRequest, sendPostRequest } from '@utils/requestUtils'

const PostContent = ({ postData, editorState }) => {

  const {
    _id: postId,
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

  const { data: session } = useSession()
  const [likedStatus, setLikedStatus] = useState()
  const [ voteCountSum, setVoteCountSum ] = useState(upVoteCount - downVoteCount)

  const likeOrDislikeUrl = useMemo(() => {
    if (session?.user?.id && postId) {
      return `/api/likeOrDislike/${session.user.id}/${postId}`
    }
    return null
  }, [session?.user?.id, postId])

  useEffect(() => {
    async function fetchLikedStatus() {
      if (!session?.user?.id || !postId) {
        return
      }
      const response = await sendGetRequest({
        url: likeOrDislikeUrl,
      })
      const { liked } = await response.json()
      setLikedStatus(liked)
    }
    fetchLikedStatus()
  }, [session?.user?.id, postId, likeOrDislikeUrl])

  const handleLikeButtonClick = async () => {
    await sendPostRequest({
      url: likeOrDislikeUrl,
      body: {
        userId: session.user.id,
        postId,
        liked: true,
      },
    })

    // If performing the same action, we want to delete the like record.
    if (likedStatus) {
      console.log('we are repeating the same action')
      setVoteCountSum((prev) => prev - 1 )
      setLikedStatus(null)
      await sendPatchRequest({
        url: `/api/post/${postId}`,
        body: {
          ...postData,
          upVoteCount: upVoteCount - 1
        }
      })
      await sendDeleteRequest({
        url: likeOrDislikeUrl
      })
      return
    }

    setLikedStatus(true)
    setVoteCountSum((prev) => prev + 1 )
    return await sendPatchRequest({
      url: `/api/post/${postId}`,
      body: {
        ...postData,
        upVoteCount: upVoteCount + 1
      }
    })
  }

  const handleDislikeButtonClick = async () => {
    await sendPostRequest({
      url: likeOrDislikeUrl,
      body: {
        userId: session.user.id,
        postId,
        liked: false,
      },
    })
    if (likedStatus === false) {
      setVoteCountSum((prev) => prev + 1 )
      setLikedStatus(null)
      return await sendDeleteRequest({
        url: likeOrDislikeUrl
      })
    }
    setLikedStatus(false)
    setVoteCountSum((prev) => prev - 1 )
    return await sendPatchRequest({
      url: `/api/post/${postId}`,
      body: {
        ...postData,
        downVoteCount: downVoteCount + 1
      }
    })
  }

  const createdDate = new Date(createdAt)
  const createdDateConverted = createdDate.toLocaleString()

  return (
    <BorderedBox padding={16} width={'70%'}>
      <HStack gap={5}>
        <VStack justifyContent={'center'}>
          {likedStatus ? (
            <Image
              src="/arrow-up-filled.png"
              alt="like post button"
              height={50}
              width={30}
              onClick={handleLikeButtonClick}
            />
          ) : (
            <Image
              src="/arrow-up.png"
              alt="like post button"
              height={50}
              width={30}
              onClick={handleLikeButtonClick}
            />
          )}

          <Text> { voteCountSum}</Text>
          {likedStatus === false ? (
            <Image
              src="/arrow-down-filled.png"
              alt="dislike post button"
              height={50}
              width={30}
              onClick={handleDislikeButtonClick}
            />
          ) : (
            <Image
              src="/arrow-down.png"
              alt="dislike post button"
              height={50}
              width={30}
              onClick={handleDislikeButtonClick}
            />
          )}
        </VStack>
        <Box>
          <Text>
            {' '}
            Posted by {username} on {createdDateConverted}{' '}
          </Text>
          <Heading> {title} </Heading>
          <Text> {viewCount} views</Text>
        </Box>
      </HStack>

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

      <Divider marginY={4} />
      <Textarea placeholder="Leave a comment" />
      <Button> Comment </Button>
    </BorderedBox>
  )
}

export default PostContent
