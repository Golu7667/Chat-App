import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import Chatpage from './pages/Chatpage'

function App() {

  return (
	<>
  
   <Routes>
     <Route path="/" element={<Login/>}/ >
     <Route path='/signup' element={<Signup/>}/>
     <Route path="/chats" element={<Chatpage/>}/>
   </Routes>

	</>
  )
}

export default App