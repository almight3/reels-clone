import React,{useState,useEffect} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayUnion, doc, updateDoc,arrayRemove } from 'firebase/firestore';
import {db} from "../firebase"
function LikeModal({post,userData}) {
    const [like,setLike] = useState(null)
    useEffect(()=>{
          if(post.likes.includes(userData.uid)){
              setLike(true)
          }
          else{
              setLike(false)
          }
  
    },[post]) 
    
    const onClickHandler= async()=>{
        if(like){
            await updateDoc(doc(db, "posts", post.postId), {
                likes: arrayRemove(userData.uid)
            })
        }
        else{
            await updateDoc(doc(db, "posts", post.postId), {
                likes: arrayUnion(userData.uid)
            })
        }
     }

  return (
    <FavoriteIcon style={like? {color:"red"}:{color:"white"}} onClick={onClickHandler}/>
  )
}

export default LikeModal