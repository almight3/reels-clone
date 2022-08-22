import React from 'react'
import Login from './component/Login'
import Signup from './component/Signup'
import Feeds from './component/Feeds'
import Profile from './component/Profile'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import PrivatRoutes from './component/ProtectedRoutes'
import { AuthProvider} from './context/AuthContext'
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
         <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
         <Route element={<PrivatRoutes />}>
           <Route path="/feed" element={<Feeds/>} />
           <Route path="/" element={<Navigate to = "/feed" /> } />
           <Route path="/profile/:id" element={<Profile />}></Route>
         </Route>
      </Routes>
    </AuthProvider> 
    </BrowserRouter>
    )
}

export default App