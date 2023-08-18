import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";


const Chatpage = () => {
        const {user}=ChatState();
        const navigate=useNavigate();

        useEffect(()=>{
          if(!user){
            navigate("/")
          }else{
            navigate("/chats")
          }
        },[navigate])


  return (
    <div style={{ width: "100%" , backgroundColor:"red"}}>
       <SideDrawer />
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {/* {user && <MyChats fetchAgain={fetchAgain} />} */}
        {/* {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )} */}
      </Box>
    </div>
  );
};

export default Chatpage;
