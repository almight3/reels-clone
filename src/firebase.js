import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDuZRmQuD-ap0AgOhynYPpy4QF3nOXOuKc",
    authDomain: "reels-fa293.firebaseapp.com",
    projectId: "reels-fa293",
    storageBucket: "reels-fa293.appspot.com",
    messagingSenderId: "697772833833",
    appId: "1:697772833833:web:873786928df971536b3038",
    measurementId: "G-159ENT67LV"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db =  getFirestore(app);
export const storage = getStorage(app);
