import React, { forwardRef, useState } from 'react'
import { InputGroup, Input, IconButton, Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const PollOption = (
  { option: optionId, pollOptions, setOptionCount, setPollOptions },
  ref
) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
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
    <InputGroup>
      <Input
        placeholder={`Option ${optionId}`}
        marginRight={4}
        marginBottom={2}
        ref={ref}
        value={inputValue || ''}
        onChange={handleInputChange}
      />

      <Box w={10}>
        {optionId > 2 && (
          <IconButton
            icon={<DeleteIcon />}
            bg={'#f28482'}
            color={'white'}
            onClick={() => handleDeleteOption(optionId)}
          />
        )}
      </Box>
    </InputGroup>
  )
}

export default forwardRef(PollOption)
