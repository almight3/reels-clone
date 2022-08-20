import React,{useState,useContext} from 'react'
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
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
function Login() {
const [email,setEmail] = useState();
const [password,setPassword] = useState();
const [error,setError] = useState('');
const [loading,setLoading] = useState(false);
const {login} = useContext(AuthContext)
const navigate = useNavigate()
const onClickHandler = async()=>{
  try{
    setError('')
    setLoading(true)
    await login(email,password)
    setLoading(false)
    navigate("/feed")
  }
  catch(error){
    setError(error.code)
    console.log(error.code)
    setLoading(false)
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
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true}  margin="dense" type="email" onChange={(e)=>setEmail(e.target.value)} />
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" type="password" onChange={(e)=>setPassword(e.target.value)}/>
      </CardContent>
      <CardContent>
        <CardActions>
          <Button variant="contained" fullWidth={true} margin="dense" onClick={onClickHandler} >Log in</Button>
        </CardActions>
        <Typography gutterBottom variant="h6" component="div" align="center" sx={{fontWeight:500,fontSize:'0.8rem',margin:'1rem 0 0 0'}}>
       <Link to="/login" style={{textDecoration:"none",color:"black" }}> Forget Password ?</Link>
      </Typography>
      {error!='' && <Typography gutterBottom variant="h6" component="div" align="center" color="red" sx={{fontWeight:500,fontSize:'0.8rem',margin:'0.5rem 2rem'}}>
       {error}
      </Typography>}
      </CardContent>
    </Card>
    <Card variant='outlined' sx={{margin:"1rem 0"}} >
    <Typography gutterBottom variant="h6" component="div" align="center" sx={{fontWeight:500,fontSize:'0.8rem',margin:'1.5rem 0rem'}}>
       Don't Have an account?<Link to="/signup" style={{textDecoration:"none", color:"#0095f6",fontWeight:'bold'}}> Sign up</Link>
      </Typography>
    </Card>
       </div>
    </div>
  )
}

export default Login