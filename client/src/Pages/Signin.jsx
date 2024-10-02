import React, { useState } from 'react'
import {Alert, Button, Spinner, TextInput} from 'flowbite-react';
import { FaGoogle,FaEye,FaEyeSlash } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { signInStart,signInSuccess,signInFailure, resetError, } from '../Redux/Theme/userSlice';
import axios from 'axios';
import OAuth from '../Components/OAuth';
import Message from '../Components/Message';
const Signin = () => {

  const navigate = useNavigate();


  const error = useSelector((state)=>state.user.error)
 const loading= useSelector ((state)=>state.user.loading);
  const  dispatch = useDispatch();
  
  const [showPassword,setShowPassword] = useState(false);
const  [formdata , setFormData] = useState({})

const handleOnChange = (e) =>{

  setFormData({
    ...formdata,
    [e.target.name]:e.target.value
  })
}

const handleSubmit =  async(e)=>{

  e.preventDefault();

  try {

    dispatch(signInStart());
    const response = await axios.post("http://localhost:8000/api/auth/signin",
    formdata,
    {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    });

    if(response){
      dispatch(signInSuccess(response.data))
      navigate("/dashboard");
    }
  } catch (error) {

    dispatch(signInFailure(error.response.data))
  }
}
const toggleShowPassword = () =>{

  setShowPassword(showPassword?false:true);
}
if(error){
  setTimeout(()=>{
   dispatch(resetError());
  },3000)
}
  return (
    <div className='mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4 mx-4' onSubmit={handleSubmit}>
        <TextInput type='email' placeholder='Enter your email' onChange={handleOnChange} name='email'/>
        <div className='relative'>
        <TextInput type={showPassword?"text":"password"} className='w-full' placeholder='Enter your password' onChange={handleOnChange} name='password'/>
        {
          showPassword?
          <FaEyeSlash onClick={toggleShowPassword}  className=" cursor-pointer absolute right-2 top-3"/>: <FaEye onClick={toggleShowPassword} className=" cursor-pointer absolute right-2 top-3"/>
        }
        </div>
        <Button gradientDuoTone={"purpleToPink"} type='submit' outline>{loading?<> <Spinner size={"sm"} color={"failure"} /> <span className='ml-1'>Loading...</span></>:"Sign In"}</Button>
        <OAuth text="Continue with Google"/>
       {
        error &&
       <Message message={error.message} type={'failure'}/>
       }
      </form>
      <div className=" flex gap-1 mx-4 mt-2">
      <p>Don't Have an Account?</p>
      <Link to={"/signup"} className=' text-blue-600 underline'>Sign up</Link>
      </div>
    </div>
  )
}

export default Signin
