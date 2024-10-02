import React, { useState } from 'react'
import {Alert, Button, Spinner, TextInput} from 'flowbite-react';
import { FaGoogle,FaEye,FaEyeSlash } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
import OAuth from '../Components/OAuth';
const SignUp = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState()
 const [error,setError] = useState(null);
 const [showPassword,setShowPassword] = useState(false);
 const [loading,setLoading] = useState(false);
  const handleOnChange = (e) =>{

    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }

  const toggleShowPassword = () =>{
    setShowPassword(showPassword?false:true);
  }

  if(error){
    setTimeout(()=>{
      setError(null)
    },3000)
  }
  const handleSubmit = async (e) =>{

    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/auth/signup",
      user,
      {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
        
      });

      if(response){
        console.log(response.data);
        setLoading(false)
        navigate("/signin")
      }
      
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form  className='flex flex-col gap-4 text-center' onSubmit={handleSubmit}>
        <TextInput placeholder='Username' onChange={handleOnChange} type='text' name='username'/>
        <TextInput placeholder='Email' onChange={handleOnChange} type='email' name='email'/>
        <div className='relative'>
        <TextInput type={showPassword?"text":"password"} className='w-full' placeholder='Enter your password' onChange={handleOnChange} name='password'/>
        {
          showPassword?
          <FaEyeSlash onClick={toggleShowPassword}  className=" cursor-pointer absolute right-2 top-3"/>: <FaEye onClick={toggleShowPassword} className=" cursor-pointer absolute right-2 top-3"/>
        }
        </div>

        <Button gradientDuoTone={"purpleToPink"} type='submit'  outline>{loading?<><Spinner size={"sm"}/> <span className='ml-1 text-sm'>Loading...</span></>  :"Sign Up"}</Button>
        <OAuth text={"Signup With Google"}/>
        {
        error &&
        <Alert color={"red"} className='text-center'>{error}</Alert>
      }
      </form>
    
    <div className='mt-2 flex items-center gap-1'>
      <p className='text-sm'>Have an Account? </p>
      <Link className='text-blue-500 cursor-pointer underline text-sm' to={"/signin"}>Sign in</Link>
    </div>
    </div>
  )
}

export default SignUp
