'use client'
import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Box,
  Flex,
  Heading,
  Select,
  IconButton,
  VStack,
  Text,
  HStack,
  Divider,
  useToast,
} from '@chakra-ui/react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useState, useEffect, useRef, createRef } from 'react'

import PollOption from 'components/PollOption'


export default function PostCreation() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [pollOptions, setPollOptions] = useState([1, 2])
  const [optionCount, setOptionCount] = useState(pollOptions.length + 1)
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const toast = useToast()
  const inputRefs = useRef([])

  useEffect(() => {
    if (optionCount <= 6) {
      setIsAddButtonDisabled(false)
    } else {
      setIsAddButtonDisabled(true)
    }
  }, [optionCount])

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent()
    const contentRaw = convertToRaw(contentState)
    const text = contentState.getPlainText()
    inputRefs.current.forEach((currentRef, index) => {
      const value = currentRef?.current?.value
      if (value.trim() === '') {
        toast({
          title: 'Empty option',
          description:
            'You cannot use an empty option! Please enter something.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    })
  }

  const handleAddOption = () => {
    if (optionCount <= 6) {
      setPollOptions((prevOptions) => [...prevOptions, optionCount])
      setOptionCount((prevCount) => prevCount + 1)
    }
  }

  return (
    <>
      <Flex direction={'column'} w={'100%'} gap={5}>
        <Heading>Create a post</Heading>
        <Divider />
        <Box
          variant="bordered"
          border={'1px solid #c5e9eb'}
          borderRadius={8}
          flexGrow={1}
          padding={5}
        >
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              options: ['inline', 'fontSize', 'list'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
            }}
          />
        </Box>
        <VStack
          spacing={'10px'}
          alignItems={'start'}
          border={'1px solid #c5e9eb'}
          padding={10}
          borderRadius={8}
        >
          <Text fontSize="lg"> Add options for your poll. </Text>

          {pollOptions.map((option, index) => {
            inputRefs.current[index] = inputRefs.current[index] || createRef()
            return (
              <PollOption
                key={index}
                ref={inputRefs.current[index]}
                pollOptions={pollOptions}
                option={option}
                setOptionCount={setOptionCount}
                setPollOptions={setPollOptions}
              />
            )
          })}

          <HStack>
            <IconButton
              isDisabled={isAddButtonDisabled}
              icon={<AddIcon />}
              color={'black'}
              onClick={handleAddOption}
            />
            <Select placeholder="Voting length (days)">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </Select>
          </HStack>
        </VStack>
        <HStack justifyContent="flex-end">
          <Button variant="outline"> Save Draft </Button>
          <Button onClick={handleSubmit}> Post </Button>
        </HStack>
      </Flex>
    </>
  )
}
