import React,{useEffect,useState} from 'react'
import {db} from '../firebase'
import {doc,DocumentSnapshot,getDoc,onSnapshot} from "firebase/firestore"
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { async } from '@firebase/util';


function Comments({postData}) {
  const [comments,setComments] = useState(null);
  
  useEffect(()=>{
  let commentsArray = [];
  setComments('')
  console.table(postData)
  const fetchComment = async(postData)=>{
  console.log('Comments',comments)
  for(let i = 0 ;i<postData.comments.length;i++){
      let docRef = doc(db,"comments",postData.comments[i]);
      let docSnap = await getDoc(docRef);
      console.log("docData",docSnap.data());
      commentsArray.push(docSnap.data());
    }
  }
  fetchComment(postData)
  console.log("")
  setComments(commentsArray)
  
},[postData])
  
  
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