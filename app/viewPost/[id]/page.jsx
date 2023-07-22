'use client'

import { Flex, Heading, Spinner } from '@chakra-ui/react'
import Post from 'components/Post'
import React, { useEffect, useState } from 'react'
import { EditorState } from 'draft-js'
import { convertFromRaw } from 'draft-js'

const ViewPostPage = ({ params }) => {
  const { id: postId } = params
  const [postData, setPostData] = useState()
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  useEffect(() => {
    async function fetchPost({ postId }) {
      try {
        const response = await fetch(`/api/post/${postId}`)
        const data = await response.json()
        if (response.ok) {
          setPostData(data)
          if (data.content) {
            const contentState = convertFromRaw(JSON.parse(data?.content))
            setEditorState(EditorState.createWithContent(contentState))
          }
        }
      } catch (error) {
        console.log('error:', error)
      }
    }
    fetchPost({ postId })
  }, [postId])

  return postData ? (
    <Post postData={postData} editorState={editorState} />
  ) : (
    <Spinner size="xl" />
  )
}

export default ViewPostPage
