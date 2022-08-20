import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {db} from "../firebase"
import { arrayUnion, doc, setDoc,updateDoc} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
function AddComments({post,userData}) {
    const [text,setText] = useState('')
    
    
    const handleClick = async()=>{
    let cid = uuidv4()
    let commentObj = {
        text:text,
        userProfilePicture:post.profileUrl,
        userName:post.profileName,
        cid:cid
    }
    await setDoc(doc(db,"comment"),commentObj)
    await  updateDoc(doc(db,"posts",cid),{
       comments:arrayUnion(cid)
    })
    
    setText('')
    console.log("check")
        
    }
  
    return (
    <div style={{width:"100%"}}>
        <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{width:'70%'}} value={text} onChange={(e)=>setText(e.target.value)}/>
        <Button variant="contained" onClick={handleClick}>Post</Button>
    </div>
  )
}

export default AddComments