import React,{useState,useEffect} from 'react'
import {db} from '../firebase'
import { doc,collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import Videos from './Videos'
import "./Feeds.css"
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Comments from './Comments'
import AddComments from "./AddComments"
import LikeModal from "./LikeModal"
import Typography from '@mui/material/Typography';





function Posts({userData}) {
const [posts,setPost] = useState();
const [open, setOpen] = React.useState(null);
// useEffect to detect any changes
useEffect(()=>{
    let postData = onSnapshot(query(collection(db,"posts"),orderBy("timestamp","desc")),(snapshot)=>{
        let tempArray = [];
        console.log("snapShot",snapshot)
        snapshot.docs.map((doc)=>{
            tempArray.push(doc.data())
            console.log("doc data",doc.data())
        })
        setPost([...tempArray])
        console.log("temp",tempArray)
    })
    return ()=>postData()
},[])
console.log("posts",posts)

// modal opne and close handler
const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };


return (
    <div className="video-container">
         {
         posts== null || userData==null ? <CircularProgress /> :
         <div className="videos">
            {posts.map((post)=>(
            <div className="videos" >
                <Videos postUrl={post.postUrl} />
                <div className="videos-info">
                  <div className="avatar_container">
                  <Avatar alt="Remy Sharp" src={post.profileUrl}  sx={{ margin: "0.5rem" }}/>
                <p style={{ color: "white", fontWeight: "bold" }}>{post.profileName}</p>
                 </div>
                 <div className="post-like">
                  <Like post={post} userData={userData}/>
                  <CommentIcon sx={{marginTop:"0.5rem" ,color:"white"}} onClick={()=>handleClickOpen(post.postId)}/>
                  <Dialog
                        open={open == post.postId}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth ={true}
                        maxWidth = 'md'
                    >
                     <div className="modal-container">
                        <div>
                           <video className="modal-video" controls  >
                               <source src={post.postUrl} />
                           </video>
                        </div>
                        <div className="modal-comment">
                              <Card className="card1" style={{padding:'1rem'}}>
                                   <Comments postData={post} />
                              </Card>
                             <Card>
                             <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                            <div>
                                <LikeModal post={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                <AddComments post={post} userData style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                            </div>                               
                           
                            </Card>
                        </div>
                     </div>
                    </Dialog>
                  </div>
                </div>
            </div>
         ))}
         </div>
          }
    </div>
  )
}

export default Posts