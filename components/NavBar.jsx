'use client'

import React, { useEffect, useState } from 'react'
import {
  Flex,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
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
      <Flex align="center" justifyContent={'end'} justify="space-between">
        {session?.user ? (
          <Button onClick={signOut}>Log out</Button>
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
      </Flex>
    </Box>
  )
}

export default NavBar
