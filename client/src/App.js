import React,{ useEffect} from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'
import Chatpage from './pages/Chatpage'
import {ChatState} from './Context/ChatProvider'

function App() {
 const navigate=useNavigate();
 const {user}=ChatState(); 
  console.log(user)
//  useEffect(()=>{
//     if(user){
//       navigate("/chats")
//     }else{
//       navigate("/login")
//     }
//  },[])

   
  return (
	<>
  
   <Routes>
      {/* <Route path='/' element={<>hi</>}/> */}
     <Route path="/" element={<Login/>}/ >
     <Route path='/signup' element={<Signup/>}/>
     <Route path="/chats" element={<Chatpage/>}/>
   </Routes>

	</>
  )
}

export default App