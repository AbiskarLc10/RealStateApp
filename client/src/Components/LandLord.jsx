import React, { useState,useEffect } from 'react'
import { Textarea ,Button} from 'flowbite-react'
import axios from 'axios'
import { Link } from 'react-router-dom';
const LandLord = ({list}) => {

const [message,setMessage] = useState('');
const [landlord,setLandLord] = useState({});
    useEffect(()=>{

       
        const getLandLordInfo = async () =>{

            try {
            const response = await axios.get(`http://localhost:8000/api/user/${list.userRef}`,
        {
            headers:{
                "Content-Type":"application.json"
            },
            withCredentials:true
        })

        if(response.data){
setLandLord(response.data);
        }
    } catch (error) {
        console.log(error);
       }
        }
        
        getLandLordInfo();
     

     
    },[list.userRef])
  return (
    <>
    {

        landlord &&
           <>
           <p className=' text-teal-500'>Contact  <span className=' font-semibold text-gray-700 dark:text-gray-300 capitalize'>{landlord.username}</span> for <span className='font-semibold text-gray-700 dark:text-gray-300'>{list.name.toLowerCase()}</span></p>
           <Textarea name="message" id="message" onChange={(e)=> setMessage(e.target.value)} placeholder="Enter the Message" value={message}/>
        <Button gradientDuoTone={"purpleToBlue"}  outline>
            <Link to={`mailto:${landlord.email}?subject:${list.name}&body:${message}`}>
            Send Message
            </Link>
            </Button>
           </>
        
    }
   
    </>
  )
}

export default LandLord