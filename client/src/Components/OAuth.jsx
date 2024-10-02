import React, { useState } from 'react'
import {Button} from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import { signInSuccess } from '../Redux/Theme/userSlice';
import {useNavigate} from 'react-router-dom'
import  axios  from 'axios';
const OAuth = (props) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick =async () =>{

    try {
      
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app);

      const result = await signInWithPopup(auth,provider);
      // console.log(result);
      const response = await axios.post("http://localhost:8000/api/auth/google",
    {
      username: result.user.displayName,
      email: result.user.email,
      profilePicture: result.user.photoURL
    },
  {
    headers:{
      "Content-Type":"application/json",

    },
    withCredentials:true
  });

  if(response){
    dispatch(signInSuccess(response.data));
    navigate("/");
    console.log(response);
  }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button  onClick={handleGoogleClick} outline><span className=' mr-2'><FaGoogle/></span>{props.text}</Button>
  )
}

export default OAuth
