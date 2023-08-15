import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import { ChatState } from "../../Context/ChatProvider";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect } from "react";


function SideDrawer () {
  
  const [search,setSearch]=useState();
  const [loading,setLoading]=useState(false)

   const {isOpen,onOpen,onClose}=useDisclosure();

   const toast= useToast();  
   const  {user} = ChatState();
   const handleSearch= async()=>{
       if(!search){
        toast({
          title:"Please Enter something in search",
          status:"warning",
          duration:"5000",
          isClosable:true,
          position:"bottom-center"
        })
       } 
       try {
                 setLoading(true)
                 const {data} = await axios.get(`http://localhost:8000/api/user?search=${search}`)
                  console.log(data)
                  setLoading(false)

            }catch(error){
              toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
            }



       

   }



  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="1px"
      >
        {/* Tooltip */}
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" border="1px solid green"  onClick={onOpen}>
            <Search2Icon />
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        {/* Tooltip */}

        <Text fontSize="2xl" fontFamily="Work sans">
          Chat App
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                // count={notification.length}
                // effect={Effect.SCALE}
              /> */}
              <BellIcon fontSize="2xl" m={1} color="green" />
            </MenuButton>
            <MenuList pl={2}>
              {/* {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    :null}
                </MenuItem>
              ))} */}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
              border="1px solid green"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                // name={user.name}
                // src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input placeholder="Search by name or email" mr={2}  value={search}
                onChange={(e) => setSearch(e.target.value)} />
              <Button  onClick={handleSearch}>Go</Button>
            </Box>
            {/*             
              <ChatLoading />
            
            <Spinner ml="auto" d="flex" /> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
