import React,{ useEffect} from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'
import Chats from './pages/Chats'

function App() {
 const navigate=useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) 
    {
      navigate("/chats");
    }else{
      navigate("/login")
    }
   


  }, []);

  return (
	<>
  
   <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path="/chats" element={<Chats/>}/>
   </Routes>

	</>
  )
}

export default App