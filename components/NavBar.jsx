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
import Image from 'next/image'

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
    <HStack
      bg="#1d3557"
      w="100%"
      padding="2"
      justifyContent={'space-between'}
      paddingX={5}
    >
      <Image
        src="/logo-yellow.svg"
        width={120}
        height={20}
        alt={'Am I the Jerk (AITJ) website logo'}
      />
      <HStack align="center" justifyContent={'flex-end'} spacing="24px">
        {session?.user ? (
          <>
            <NextLink href="/createPost">
              <IconButton aria-label="Post" icon={<AddIcon />}></IconButton>
            </NextLink>
            <Button onClick={signOut}>Log out</Button>
          </>
        ) : (
          <Menu>
            <MenuButton bg={'#ffda3a'} as={Button}>
              Sign In
            </MenuButton>
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
    </HStack>
  )
}

export default NavBar
