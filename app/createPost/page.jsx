'use client'
import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Box,
  Flex,
  Heading,
  Select,
  IconButton,
  Text,
  HStack,
  Divider,
  useToast,
  Input,
} from '@chakra-ui/react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useState, useEffect, useRef, createRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import PollOption from 'components/PollOption'
import BorderedBox from 'components/BorderedBox'
import { useSession } from 'next-auth/react'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
export default function CreatePostPage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [pollOptions, setPollOptions] = useState([1, 2])
  const [optionCount, setOptionCount] = useState(pollOptions.length + 1)
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false)

  const toast = useToast()
  const inputRefs = useRef([])
  const titleRef = useRef()
  const votingLengthRef = useRef()

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (optionCount <= 6) {
      setIsAddButtonDisabled(false)
    } else {
      setIsAddButtonDisabled(true)
    }
  }, [optionCount])

  const validateInputs = ({ title, pollOptions }) => {
    if (title.trim() === '') {
      toast({
        title: 'Empty title',
        description: 'Title is empty!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return false
    }

    const hasEmptyPollOption = pollOptions.some(
      (pollOption) => pollOption.trim() === ''
    )
    if (hasEmptyPollOption) {
      toast({
        title: 'Empty poll option',
        description: 'You cannot use an empty option! Please enter something.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    const contentState = editorState.getCurrentContent()
    const contentRaw = JSON.stringify(convertToRaw(contentState))
    const title = titleRef.current.value
    const votingLength = votingLengthRef.current.value
    const pollOptionValues = inputRefs.current.map(
      (currentRef) => currentRef.current.value
    )
    const areAllInputsValid = validateInputs({
      title,
      pollOptions: pollOptionValues,
      content: contentRaw,
    })

    if (session.user.id && areAllInputsValid) {
      try {
        const response = await fetch('/api/post/new', {
          method: 'POST',
          body: JSON.stringify({
            title,
            userId: session?.user?.id,
            username: session?.user?.name,
            content: contentRaw,
            votingLength,
          }),
        })
        if (response.ok) {
          router.push('/')
          toast({
            title: 'Poll creation success',
            description: 'Post created!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
      } catch (error) {
        console.log('error:', error)
      }
    }
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
        <BorderedBox flexGrow={1} padding={6}>
          <Input placeholder={'title'} marginBottom={4} ref={titleRef} />
          <BorderedBox flexGrow={1} padding={6}>
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
          </BorderedBox>
        </BorderedBox>
        <HStack
          spacing={10}
          alignItems={'start'}
          border={'1px solid #e5e5e5'}
          padding={6}
          borderRadius={8}
          bg={'white'}
        >
          <Box flexGrow={1}>
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

            <HStack justifyContent={'space-between'}>
              <IconButton
                isDisabled={isAddButtonDisabled}
                icon={<AddIcon />}
                color={'black'}
                onClick={handleAddOption}
              />

              <HStack>
                <Text whiteSpace={'nowrap'}> Voting length (days): </Text>
                <Select
                  defaultValue={7}
                  w={100}
                  marginRight={50}
                  ref={votingLengthRef}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </Select>
              </HStack>
            </HStack>
          </Box>

          <BorderedBox w={'30%'} h={200}></BorderedBox>
        </HStack>
        <HStack justifyContent="flex-end">
          <Button variant="outline"> Save Draft </Button>
          <Button onClick={handleSubmit}> Post </Button>
        </HStack>
      </Flex>
    </>
  )
}
