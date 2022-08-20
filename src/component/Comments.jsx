import React,{useEffect,useState} from 'react'
import {db} from '../firebase'
import {doc,DocumentSnapshot,getDoc,onSnapshot} from "firebase/firestore"
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { async } from '@firebase/util';


function Comments({post}) {
  const [comments,setComments] = useState(null)
  
//   useEffect(()=>{
//   async function fetchComment(post){
//   let arr = []
//   for(let i = 0;i<post.comments.length;i++){
//   let docRef = doc(db,"comment",post.comments[i]);
//   let docSnap = await getDoc(docRef) 
//   arr.push(docSnap.doc())
//   console.log(docSnap.doc())
//   }}
//   fetchComment(post)   
// },[post])
  
  
  return (
    <div>
      { 
      comments == null ? <CircularProgress /> : 
      <>
        {
          comments.map((comment,index)=>(
            <div style={{display:'flex'}}>
            <Avatar  src={comment.userProfilePicture}/>
            <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.userName}</span>&nbsp;&nbsp; {comment.text}</p>
            </div>
            ))
            
        }
      </>
      }
    </div>
  )
}

export default Comments