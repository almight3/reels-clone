import { Button } from '@mui/material'
import React,{useState,useContext,useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import Upload from './Upload'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Posts from './Posts'
import "./Feeds.css"
import NavBar from "./NavBar"
function Feeds() {
  const {logout,user} = useContext(AuthContext)
  const [userData,setUserData] = useState([]);
  const  navigate  = useNavigate();
  useEffect(()=>{
   onSnapshot(doc(db,"users",user.uid),(doc)=>{
    setUserData(doc.data())
   })
  },[])
  
  
  console.log(userData)
  
  const logOutHandler= async()=>{
    logout();
    navigate("/login")
  }
  return (
   <div className="feed-container">
    <NavBar userData={userData} />
    <Upload userData={userData} />
    <Posts userData={userData}/>
   </div>
  )
}

export default Feeds