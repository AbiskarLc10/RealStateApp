import { Button, Card } from 'flowbite-react'
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const CardItem = ({list}) => {
  
    const navigate = useNavigate();
    
  return (
   <div className=' flex flex-col  h-auto shadow-md border-2 rounded-lg sm:w-[300px] border-teal-400 cursor-pointer card '  onClick={()=> navigate(`/list/${list._id}`) }>
    <img src={list.imageUrls[0]} alt={`image of ${list.name}`} className=' w-full h-[200px] rounded-t-lg border-b-2'/>
    <div className=' flex  flex-col p-2 justify-center gap-1'>
        <p className=' text-lg font-semibold'>{list.name.length>20?list.name.slice(0,30):list.name}...</p>
        <div className=' flex gap-1 items-center text-xs text-green-500'><FaLocationDot/><p>{list.address}</p></div>
        <p className=' text-sm  text-justify'>{list.description.length>80?list.description.slice(0,80):list.description}....</p>
        <div className=' flex text-xs gap-2'>
            <p className=' text-red-600'> <span>{list.bedrooms}</span> Beds</p>
            <p className=' text-blue-500'> <span>{list.bathrooms}</span> Bath</p>
        </div>
        <p className=' text-sm text-red-600'>${list.regularPrice}/months</p>
         
    </div>

   </div>
  )
}

export default CardItem