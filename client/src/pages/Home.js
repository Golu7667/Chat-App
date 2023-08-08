import React from 'react'
import Login from '../components/Authentication/Login'
import { Container } from '@chakra-ui/react'

function Home() {
  return (
    <Container maxW="xl" centerContent>
      <Login/>
    </Container>
  )
}

export default Home