import React,{useContext,useEffect,useState} from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import {db,storage} from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import Alert from '@mui/material/Alert';



function Upload({ userData }) {
    const [error,setError] = useState();
    const [loading,setLoading] = useState(false);
    const onChangehandler = async (file)=>{
      if(file==null){
        setError("please select file")
        setTimeout(()=>{
          setError('')
        },2000)
        return
      }
      if(file.size /(1024*1024) >100){ 
        setError("file size cannot be reator then 100mb")
        setTimeout(()=>{
          setError('')
        },2000)
        return
      }
      try{
      let uid = uuidv4()
      setLoading(true)
      console.log(userData)
      const storageRef = ref(storage,`${userData.uid}/posts/${uid}`);
      console.log("uploading data")
        const uploadTask = uploadBytesResumable(storageRef, file);
        

          uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            console.log(error)
            setError(error.message)
            setTimeout(()=>{
              setError('')
            },3000)
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              let obj = {
                likes: [],
                postId: uid,
                postUrl: downloadURL,
                profileName: userData.name,
                profileUrl: userData.photoURL,
                uid: userData.uid,
                timestamp: serverTimestamp()
            }
            await setDoc(doc(db, "posts", uid), obj);
            console.log("post added in post collection")
            await updateDoc(doc(db, "users", userData.uid), {
              posts: arrayUnion(uid)
          })
          setLoading(false);
          console.log("doc added")
            });
          }
          );  
          }catch(error){
            setError(error.message)
            setTimeout(()=>{
              setError('')
            },3000)

        }


    }
   
  return (
    <div className='upload-btn'>
    { 
      error!=null ?      <Alert severity="error">{error}</Alert>:<Button variant="outlined" color="secondary" component="label" startIcon={<MovieIcon />} style={{marginTop:'0.5%'}}>
         <input type="file" accept="video/*" style={{ display: 'none' }} onChange={(e)=>onChangehandler(e.target.files [0])} />Upload video
      </Button>
    }
    {loading &&  <LinearProgress color="secondary"  style={{marginTop:"1%",maxWidth:"172px"}}/>}
    </div>
  )
}

export default Upload