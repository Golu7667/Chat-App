import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Img, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
import chatIcon from "../animation/chat.svg";
import { VscSend } from "react-icons/vsc";
import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { Divider } from "@chakra-ui/react";
const ENDPOINT = "http://localhost:8000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {


  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();



  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const { selectedChat, setSelectedChat, user, notification, setNotification } =ChatState();

  
  // Fetch messages  
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:8000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };


  // send Message 
  const sendMessage = async (event) => {
   
    if (newMessage) {
      
      socket.emit("stop typing", selectedChat._id);
      try {
       
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:8000/api/message/",
          {
            content: newMessage,
            chatId: selectedChat._id,
            userId:user._id
          }
          
        );
      
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      
          
        
      }
    }
  };




  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);



  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    console.log(selectedChatCompare)
    // eslint-disable-next-line
  }, [selectedChat]);



  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
           console.log(newMessageRecieved,selectedChatCompare._id)
      if (
       
       // if chat is not selected or doesn't match current chat
        selectedChatCompare._id == newMessageRecieved.chat._id
      ) {
        console.log("1")
        if (!notification.includes(newMessageRecieved)) {
          console.log("2")
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        console.log("3")
        setMessages([...messages, newMessageRecieved]);
        console.log(messages)
      }
    });


  },[ newMessage]); 
 
 
  // typing Handle
  const typingHandler = (e) => {
     setNewMessage(e.target.value)
    if (!socketConnected) return;
    console.log("connected");
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };


  

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            color="white"
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            bg="gray.400"
            borderRadius="lg"
          >
            <IconButton
              display={{ base: "flex"  }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Divider/>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="gray.400"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              // onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                   {/* <Img src={chatIcon} alt="ho"/> */}
                </div>
              ) : (
                <></>
              )}
              <InputGroup>
                <InputRightElement
                  pointerEvents="none"
                  children={<VscSend color="gray.300" onClick={send}/>} // Set the icon and its color
                />
                <Input
                  bg="white"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  boxShadow="0 4px 6px black"
                  borderRadius="xl"
                />
              </InputGroup>
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box h="100%" w="100%">
          {/* <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text> */}
          <Img src={chatIcon} w="100%" h="100%" onClick={sendMessage}/>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
