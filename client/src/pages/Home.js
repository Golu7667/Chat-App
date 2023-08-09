import React from 'react'
import Login from '../components/Authentication/Login'
import { Container } from '@chakra-ui/react'
import Signup from '../components/Authentication/Signup'

function Home() {
  return (
    <Container maxW="xl" centerContent>
      <Login/>
      <Signup/>
    </Container>
  )
}

export default Home