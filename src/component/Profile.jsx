import React,{useState,useEffect} from 'react'
import NavBar from "./NavBar"
import {useNavigate,useParams} from 'react-router-dom'
import {db} from '../firebase'
import {doc,getDoc} from "firebase/firestore"
import { CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Comments from './Comments'
import AddComments from "./AddComments"
import LikeModal from "./LikeModal"
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import "./Profile.css"
function Profile() {
const [users,setUsers] = useState(null)
const [posts,setPosts] = useState(null);
const {id} = useParams();  
const [open, setOpen] = React.useState(null);

useEffect(()=>{
const fetchUser = async(id)=>{
   let docRef = doc(db,"users",id)
   let snapDoc = await getDoc(docRef)
   setUsers(snapDoc.data())
   console.table(snapDoc.data())
}
fetchUser(id)
},[id])

useEffect(()=>{

const fetchUserPost = async(users)=>{
  let postsArray = []  
  for(let i = 0 ;i<users.posts.length;i++){
    let docRef = doc(db,"posts",users.posts[i]);
    let docSnap = await getDoc(docRef);
    console.log("postData",docSnap.data());
    postsArray.push(docSnap.data());
    console.log(postsArray)
    setPosts(postsArray)
  }
}
if(users != null){
fetchUserPost(users)
}

},[users])

const handleClickOpen = (id) => {
  console.log("setopen")
  setOpen(id);
};

const handleClose = () => {
  setOpen(null);
};

console.log("posts array check",posts)
  return (
    <>
     {
      posts == null || users==null ? <CircularProgress/> :
      <>
      <NavBar userData={users}/>
                <div className="spacer"></div>
                <div className="container">
                    <div className="upper-part">
                        <div className="profile-img">
                            <img src={users.photoURL}/>
                        </div>
                        <div className="info">
                            <Typography variant="h5">
                                Name : {users.name}
                            </Typography>
                            <Typography variant="h6">
                                Posts : {users.posts.length}
                            </Typography>
                        </div>
                    </div>
                    <hr style={{marginTop:'3rem',marginBottom:'3rem'}}/>
                    <div className="profile-videos">
                    {
                     posts.map((post)=>{
                     return (
                      <>
                      <div>
                       <video muted="muted" onClick={()=>handleClickOpen(post.postId)} >
                            <source src={post.postUrl} style={{backgroundColor:"black"}}/>
                         </video> 
                        <Dialog
                        open={open == post.postId}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth ={true}
                        maxWidth = 'md'
                    >
                    <CloseSharpIcon onClick={handleClose} sx={{position:"fixed",top:"20px",right:"200px",color:"white",cursor: "pointer"}}/>

                     <div className="modal-container">
                        <div>
                           <video className="modal-video" controls  >
                               <source src={post.postUrl} />
                           </video>
                        </div>
                        <div className="modal-comment">
                              <Card className="card1" style={{paddingLeft:'1rem'}}>
                                   <Comments postData={post} />
                              </Card>
                             <Card className="card2">
                             <Typography style={{paddingTop:'0.4rem 0'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                            <div>
                                <LikeModal post={post} userData={users} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                <AddComments post={post} userData style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                            </div>                               
                           
                            </Card>
                        </div>
                     </div>
                    </Dialog> 
                      </div>
                    </>)
                    })
                    }
                </div>
                </div>

      </>
     }
    </>
  )
}

export default Profile