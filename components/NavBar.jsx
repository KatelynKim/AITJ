'use client'

import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
import {
  HStack,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const NavBar = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const getAndSetProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    getAndSetProviders()
  }, [])

  return (
    <Box bg="#1d3557" w="100%" padding="2">
      <HStack align="center" justifyContent={'flex-end'} spacing="24px">
        {session?.user ? (
          <>
            <NextLink href="/post">
              <IconButton aria-label="Post" icon={<AddIcon />}></IconButton>
            </NextLink>
            <Button onClick={signOut}>Log out</Button>
          </>
        ) : (
          <Menu>
            <MenuButton as={Button}>Sign In</MenuButton>
            <MenuList>
              {providers &&
                Object.values(providers).map((provider) => (
                  <MenuItem
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name} Sign In
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Box>
  )
}

export default NavBar
