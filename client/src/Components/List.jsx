import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaParking } from "react-icons/fa";
import { FaBath, FaBed, FaChair, FaLocationDot } from "react-icons/fa6";
import { useParams,Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwipeCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import { useSelector } from "react-redux";
import LandLord from "./LandLord";
const List = () => {

 SwipeCore.use([Navigation]);

 const {currentUser} = useSelector((state)=>state.user);
 
    const {listId} = useParams();
    const [toggleMessage,setToggleMessage] = useState(false);
    const [success,setSuccess] = useState(false);
    const [data,setData] = useState({
        imageUrls:[]
    });
    useEffect(()=>{

        getListData();
    },[])
    const getListData = async() =>{

        try {
            
            const response = await axios.get(`http://localhost:8000/api/list/getlist/${listId}`,
        {
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });

        if(response.data){

            setData(response.data);
            setSuccess(true)
        }
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowMessage = () =>{

        setToggleMessage(toggleMessage?false:true);
    }

    if(success){
        return (

            <div className="min-h-screen pb-2 mx-2 text-black dark:text-gray-300 mt-4">
         
         
        {
        data.imageUrls.length >0 &&
        <Swiper navigation>{
        data.imageUrls.map((url,index)=>{
            return (
                <>
                <SwiperSlide key={url} >
                <div className=" sm:h-[550px] h-[250px] rounded-lg" style={{background: `url(${url}) no-repeat`,backgroundSize:"100% 100%",backgroundPosition:"center"}}>
        
                </div>
                </SwiperSlide>
               
                </>
            )
        })}
        
        </Swiper>
        }
        
              <div className="mt-4 sm:max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold">{data.name}- <span>${data.regularPrice}/months</span></h1>
                <div className="flex flex-col gap-2 mt-3">
                <div className=" flex text-xs items-center gap-1  text-green-700">
                <FaLocationDot />
                    <p className="">{data.address}</p>
                </div>
                <div className="flex gap-6 mt-2 ">
                    {
        
                        data.type === "rent" ?
                        <>
                        
                        <button type="button" className=" bg-red-700 px-4 py-1 border-2 border-transparent hover:bg-transparent  hover:text-blue-500 hover:border-teal-400 text-sm rounded-md capitalize">{data.type}</button>
                        <button type="button" className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  text-sm py-1 px-4 rounded-md hover:outline hover:bg-transparent">${data.discountedPrice} <span>Discount</span> </button>
                        </>:<button type="button" className=" bg-red-700 px-4 py-1 border-2 border-transparent hover:bg-transparent  hover:text-blue-500 hover:border-teal-400 text-sm rounded-md capitalize">{data.type}</button>
                    }
                  
                </div>
                <p className="text-sm"><span className=" font-semibold mr-1">Description:</span>{data.description}</p>
                <div className="flex  gap-4 sm:gap-8 text-sm text-green-600 cursor-pointer">
                    <div className="flex items-center gap-2 ">
                        <FaBed/>
                        <p>{data.bedrooms}</p>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <FaBath/>
                        <p>{data.bathrooms}</p>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <FaParking/>
                        <p>{data.parking?"Parking Available":"No Parking Space"}</p>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <FaChair/>
                        <p>{data.parking?"Furnished":"Not Furnished"}</p>
                    </div>
                </div>
                
                    
            
                {
        
                    currentUser?
                    <div className="mt-4 flex flex-col gap-3">
                        {
                            toggleMessage?
                            <>
        
                          <LandLord list={data}/>
                            </>:
                            
                            currentUser._id === data.userRef?
                            <Button  gradientDuoTone={"purpleToPink"} outline>
                            <Link to={`/editlist/${data._id}`} >
                            Edit
                          </Link>
                          </Button>
                                : <Button gradientDuoTone={"purpleToBlue"} onClick={handleShowMessage} outline>Contact LandLord</Button>
                            
                        }
                   
                    </div>
                :
                <div className=" flex flex-col mt-8 gap-4">
                   <p className=" text-lg text-gray-600 dark:text-gray-300 font-semibold">Want To contact the LandLord?</p>
                    <Button gradientDuoTone={"purpleToBlue"} outline>
                     <Link to={"/signin"}>
                     Sign In
                     </Link>   
                        </Button>
                </div>
                }
                </div>
               
              </div>
            </div>
          );
    }else{
        return (
            <div>

                <h1 className=" text-center text-2xl my-2">Unable to Fetch The List</h1>

            </div>
        )
    }
 
};

export default List;
