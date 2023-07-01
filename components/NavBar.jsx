'use client'

import React, { useEffect, useState } from 'react'
import { Flex, Box, Button } from '@chakra-ui/react'
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
    <Box bg="#1d3557" w="100%" h="60px" color="#FFFFFF">
      <Flex align="center" justify="space-between" p="4">
        {session?.user ? (
          <Button onClick={signOut}>Log out</Button>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button key={provider.name} onClick={() => signIn(provider.id)}>
                  Sign In
                </Button>
              ))}
          </>
        )}
      </Flex>
    </Box>
  )
}

export default NavBar
