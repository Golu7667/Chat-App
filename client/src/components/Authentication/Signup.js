import React,{ useEffect} from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack, HStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast, Center, Box, Text, Flex, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import baseUrl from '../../baseUrl';

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user){
      
      navigate("/chats");
    }else{
      navigate('/signup')
    }
  }, [navigate]); 

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/user`,
        {
          name,
          email,
          password,
         
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
     const response=await localStorage.setItem("userInfo", JSON.stringify(data));
      // response.then(()=>{
        setLoading(false);
        navigate("/chats")
      // }).catch((e)=>{
      //   console.log(e)
      // })
     console.log(response)
     
    
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

 
  return (
    <>
      <Center h="100vh" w="100vw">
        <Box w={[400, 400, 700]} h="650px">
          <Box h="100px" w={[400, 400, 700]} pt="50px">
            <VStack item="center">
              <Text fontSize="xl" fontWeight="bold">
                Chat App SignUp
              </Text>
              <Divider
                orientation="horizontal"
                bg="black"
                color="black"
                h="5px"
                w="200px"
              />
            </VStack>
          </Box>

          <Box
            backgroundColor="gray"
            w={[400, 400, 700]}
            h="500px"
            rounded="30px"
            boxShadow="dark-lg"
          >
            <Center h="full">
              <VStack spacing="6px" item="center">
              <FormControl id="name" isRequired>
                  <FormLabel color="white">Name</FormLabel>
                  <Input
                    value={name}
                    type="name"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                    bg="white"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel color="white">Email Address</FormLabel>
                  <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    bg="white"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color="white" >Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      bg="white"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color="white">Confirm Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      value={confirmpassword}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      bg="white"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  colorScheme="blue"
                  width="100%"
                  style={{ marginTop: 15 }}
                  onClick={submitHandler}
                  isLoading={loading}
                >
                 SignUp
                </Button>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  width="100%"
                  onClick={() => {
                    navigate("/")
                  }}
                >
                  Login
                </Button>
              </VStack>
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default Signup ;
