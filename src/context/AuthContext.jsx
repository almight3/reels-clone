import React,{useState,useEffect} from 'react'
import { auth } from '../firebase'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth' 



export const AuthContext = React.createContext();
export function AuthProvider ({children}){
const [loading,setLoading] = useState(true);
const [user,setUser] = useState('');
function register(email,password){
   return  createUserWithEmailAndPassword(auth,email,password)
}
function login(email,password){
    return signInWithEmailAndPassword(auth, email, password)
}
function logout(){
    console.log('logout')
    return signOut(auth) 
}
 useEffect(() => {
   const sub = onAuthStateChanged(auth,(user)=>{
        setUser(user);
        console.log(user)
        setLoading(false);
    })
    return () => {
        sub()
    };
 },[user]);
    
  
const store={
    user,
    register,
    login,
    logout
}
return(
    <AuthContext.Provider value={store}>
          {!loading && children}
    </AuthContext.Provider>
)    
}