import React from 'react'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'

function App() {
  return (
	<>
  
   <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
   </Routes>

	</>
  )
}

export default App