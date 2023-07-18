'use client'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  Box,
  Flex,
  Heading,
  Container,
  Select,
  Input,
  IconButton,
  VStack,
  InputGroup,
  Text,
  Stack,
  HStack,
  Divider,
} from '@chakra-ui/react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { useState, useEffect } from 'react'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function PostCreation() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [pollOptions, setPollOptions] = useState([1, 2])
  const [optionCount, setOptionCount] = useState(pollOptions.length + 1)
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false)

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
  }

  const handleAddOption = () => {
    if (optionCount <= 6) {
      setPollOptions((prevOptions) => [...prevOptions, optionCount])
      setOptionCount((prevCount) => prevCount + 1)
    }
  }

  const handleDeleteOption = (option) => {
    if (pollOptions.length < 3) return
    setPollOptions(
      pollOptions
        .filter((o) => o !== option)
        .map((o) => {
          if (o >= option) return o - 1
          else return o
        })
    )
    setOptionCount((prevCount) => prevCount - 1)
  }

  return (
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

        {pollOptions.map((option) => (
          <InputGroup key={option}>
            <Input placeholder={`Option ${option}`} marginRight={4} />
            <IconButton
              icon={<DeleteIcon />}
              bg={'#f28482'}
              color={'white'}
              onClick={() => handleDeleteOption(option)}
            />
          </InputGroup>
        ))}

        <HStack>
          <IconButton
            isDisabled={isAddButtonDisabled}
            icon={<AddIcon />}
            color={'black'}
            onClick={handleAddOption}
          />
          <Select placeholder="Voting length (days)">
            <option value="option1">1</option>
            <option value="option2">2</option>
            <option value="option3">3</option>
            <option value="option1">4</option>
            <option value="option2">5</option>
            <option value="option3">6</option>
            <option value="option1">7</option>
          </Select>
        </HStack>
      </VStack>
      <HStack justifyContent="flex-end">
        <Button variant="outline"> Save Draft </Button>
        <Button onClick={handleSubmit}> Post </Button>
      </HStack>
    </Flex>
  )
}
