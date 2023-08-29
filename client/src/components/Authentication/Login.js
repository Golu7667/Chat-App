import React,{ useEffect} from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack, HStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast, Center, Box, Text, Flex, Divider } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from '../../baseUrl';


const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user){
     
      navigate("/chats");
    }else{
      navigate('/')
    }
  }, [navigate]);
 

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/api/user/login`,
        { email, password },
        config
      );
      console.log(data)
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
     
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats")
      setLoading(false);
      
    } catch (error) {
      if(error.response.data.message=="Invalid Email or Password"){
        toast({
          title: "Invalid Email or Password",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
       else{
        toast({
          title: " Error Occurred",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
       }
      setLoading(false);
    }
  };
  return (
    <>
      <Center h="100vh" w="100vw">
        <Box w={[400, 400, 700]} h="600px">
          <Box h="50px" w={[400, 400, 700]}>
            <VStack item="center">
              <Text fontSize="xl" fontWeight="bold">
                Chat App Login
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
              <VStack spacing="20px" item="center">
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
                  <FormLabel>Password</FormLabel>
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
                <Button
                  colorScheme="blue"
                  width="100%"
                  style={{ marginTop: 15 }}
                  onClick={submitHandler}
                  isLoading={loading}
                >
                  Login
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  width="100%"
                  onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                  }}
                >
                  Get Guest User Credentials
                </Button>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  width="100%"
                  onClick={()=>{
                           navigate("/signup")
                  }}
                >
                Signup
                </Button>
              </VStack>
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default Login;
