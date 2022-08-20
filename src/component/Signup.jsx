import React,{useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Signup.css'
import InstaLogo from "./Assets/Insta.png"
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import {db,storage} from '../firebase'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore";


export default function Signup() {
  const [email,setEmail] = useState();
  const [name,setName] = useState();
  const [password,setPassword] = useState();
  const [file,setFile] = useState(null);
  const [error,setError] = useState();
  const [loading,setLoading] = useState(false);
  const {register} = useContext(AuthContext)
  const navigate = useNavigate()


  const onClickHandler = async ()=>{
    console.log(email)
    console.log(password)
    console.log(name)
    console.log(file)
    
    try{
      setError('')
      setLoading(true)
      const user =  await register(email,password)
      const storageRef = ref(storage,`${user.user.uid}/Profile`);
        const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
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
              console.log('File available at', downloadURL);
              let userObj = {
                name:name,
                email:email,
                uid:user.user.uid,
                photoURL:downloadURL,
                posts:[]
              }
              await setDoc(doc(db,"users",user.user.uid),userObj)
              console.log("doc added")
            });
          }
          );
          navigate("/feed")
        }
    catch(error){
      setLoading(false)
      setError(error.code)
      setTimeout(()=>{
        setError('')
      },3000)
    }
  }
  
  return (
   

    <div className="signup-wrapper">
       <div className='signup-container'>
       <Card variant='outlined'>
       <div className="insta-logo">
          <img src={InstaLogo}/>
       </div>  
      <CardContent>
      <Typography gutterBottom variant="h6" component="div" align="center" color="#989898" sx={{margin:'0.5rem 2rem'}}>
        Sign up to see photos and videos from your friends.
      </Typography>
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true}  
      margin="dense" type="email" onChange={(e)=>setEmail(e.target.value)}/>
      <TextField id="outlined-basic" label="FullName" variant="outlined" fullWidth={true} margin="dense" onChange={(e)=>setName(e.target.value)}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" type="password" onChange={(e)=>setPassword(e.target.value)} />
      <Button variant="outlined" component="label" fullWidth={true} margin="dense" startIcon={<CloudUploadIcon /> } onChange={(e)=>setFile(e.target.files[0])}>
            Upload Profile Picture  
        <input hidden accept="image/*" multiple type="file" />
      </Button>
     
     
      </CardContent>
      <CardContent>
      <Typography gutterBottom variant="h6" component="div" align="center" color="#989898" sx={{fontWeight:500,fontSize:'0.8rem',margin:'0.5rem 2rem'}}>
        By Signing Up you agree to our <strong>Terms,Privacy,Policy</strong> and <strong>Cookies Policy.</strong>
      </Typography>
        <CardActions>
          <Button variant="contained" fullWidth={true} margin="dense" onClick={onClickHandler}>Signup</Button>
        </CardActions>
        {error && <Typography gutterBottom variant="h6" component="div" align="center" color="red" sx={{fontWeight:500,fontSize:'0.8rem',margin:'0.5rem 2rem'}}>
       {error}
      </Typography>}
      </CardContent>
    </Card>
    <Card variant='outlined' sx={{margin:"1rem 0"}} >
    <Typography gutterBottom variant="h6" component="div" align="center"  sx={{fontWeight:500,fontSize:'0.8rem',margin:'1rem'}}>
        Have an account?<Link to="/login" style={{textDecoration:"none",color:"#0095f6"}}> Log in</Link>
     </Typography>
     
    </Card>
       </div>
    </div>
  );
}
