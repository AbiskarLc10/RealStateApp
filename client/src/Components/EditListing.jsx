import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Checkbox,Spinner, TextInput, Textarea,Label, FileInput, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import Message from './Message';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const EditListing = () => {


const {listId} = useParams();
console.log(listId);
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user)
  const [files,setFiles] = useState([]);
  const [loading,setLoading] = useState(false);
  const [submitstate,setSubmitState] = useState(false);
  const [message,setMessage] = useState(null);
  const [errormessage,seterrorMessage] = useState(null);
  const [formData,setFormData] = useState({
    imageUrls: []
  });

  useEffect(()=>{

    getPostToEdit();

  },[])


  const getPostToEdit = async() =>{


    try {

      const response = await axios.get(`http://localhost:8000/api/list/getlist/${listId}`,
    {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    });

    if(response.data){

      setFormData(response.data);
    }
      
    } catch (error) {
      seterrorMessage(error.response.data.message);
      console.log(error)
    }
  }


  
  const handleChange = (e) =>{

 if(e.target.id==="sell" || e.target.id==="rent"){
  console.log(e.target.id)
  setFormData({
    ...formData,
  type : e.target.id
  })

 }
 else if(e.target.name==='parking' || e.target.name==='offer' || e.target.name==='furnished'){

   setFormData({
     ...formData,
     [e.target.name]: e.target.checked
   })
 }else if(e.target.type==="number"){
   setFormData(
    {
      ...formData,
      [e.target.name]: Number(e.target.value)
    }
   )
 }
  else{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
     })
  }

  }

  if(message || errormessage){

    setTimeout(()=>{
    
setMessage(null);
seterrorMessage(null);
    },3000)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(formData.regularPrice < formData.discountedPrice){
      seterrorMessage("Discounted price should be less than regular price")
    }
   else if(formData.imageUrls.length < 1){
      seterrorMessage(`Insert the images of the property`)
    }else{
      setSubmitState(true);
      try {
        
        const response = await axios.put(`http://localhost:8000/api/list/updateList/${listId}`,
      formData,
    {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    if(response.data){
      setMessage(response.data.message);
      navigate(`/profile`)
    }
      } catch (error) {
        seterrorMessage(error.response.data.message)
      }
    
  
  setSubmitState(false);
    }
   
  }
  const handleImageSubmit = async () =>{

   if(files.length > 0 && files.length + formData.imageUrls.length < 7){
   setLoading(true);
    const promises = [];

    for(var i=0;i<files.length;i++){
      
      promises.push(storeImage(files[i]));

    }

    Promise.all(promises).then((urls)=>{
setLoading(false);
   setFormData({
    ...formData,
    imageUrls: formData.imageUrls.concat(urls)
   })
    })

   }else{
        seterrorMessage("you are allowed to select at most 6 images");
   }


    
  }

  const storeImage = async(file) =>{

    return new Promise((resolve,reject)=>{

      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage,filename);

      const uploadTask = uploadBytesResumable(storageRef,file);

      uploadTask.on('state_changed',
      (snapshot)=>{

        const progress = (snapshot.totalBytes/snapshot.bytesTransferred)*100;

        console.log(`File upload completed ${progress}%`)
      }
      ,
      (error)=>{
        reject(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
           resolve(downloadUrl);
        })
      }
    )
    })
  }

  const handleImageDelete = (index) =>{

    setFormData(
      {
        ...formData,
        imageUrls: formData.imageUrls.filter((url,i)=>{
          return i!==index
        })
      }
    )
  }
  return (
    <div className='mx-auto h-auto pb-11'>
      <h1 className='text-2xl text-center font-semibold mt-3'>Create a Listing</h1>
<form className='flex flex-col sm:flex-row my-7 mx-2 sm:justify-center gap-4' onSubmit={handleSubmit}>
    <div className='flex flex-col gap-4'>
    <TextInput type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name of property' minLength={'10'} maxLength={'200'} required/>
    <Textarea onChange={handleChange} value={formData.description} name='description' placeholder='Description of property' />
    <TextInput type='text' name='address'  value={formData.address} onChange={handleChange} placeholder='Address of property'/>
    <div className='mx-2 flex justify-between gap-2'>
    <div className="flex items-center gap-2">
        <Checkbox id="sell" onChange={handleChange}  checked={formData.type === "sell"}/>
        <Label htmlFor="sell">Sell</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="rent"  onChange={handleChange} checked={formData.type === "rent"}/>
        <Label htmlFor="type">Rent</Label>
      </div>
    <div className="flex items-center gap-2">
        <Checkbox id="parking" name='parking' onChange={handleChange} checked={formData.parking}/>
        <Label htmlFor="parking">Parking Spot</Label>
      </div>
   
    <div className="flex items-center gap-2">
        <Checkbox id="furnished" name='furnished' onChange={handleChange} checked={formData.furnished}/>
        <Label htmlFor="furnished">Furnished</Label>
      </div>
    <div className="flex items-center gap-2">
        <Checkbox id="offer" name='offer'  onChange={handleChange} checked={formData.offer}/>
        <Label htmlFor="offer">Offer</Label>
      </div>
    </div>
    <div className='flex justify-between gap-2'>
    <div className="flex items-center gap-2">
    <TextInput type='number' name='bedrooms' min={1} max={10} value={formData.bedrooms} onChange={handleChange} />
    <Label htmlFor="" className='text-sm'>Beds</Label>

    </div>
    <div className="flex items-center gap-2">
    <TextInput type='number' name='bathrooms'  value={formData.bathrooms} onChange={handleChange} />
    <Label htmlFor="bath" className='text-sm'>Baths</Label>

    </div>
    </div>
    <div className="flex items-center gap-2">
    <TextInput type='number' name='regularPrice' min={50} value={formData.regularPrice} onChange={handleChange}/>
    <div>

    <Label htmlFor="price" className='text-sm' >Regular price a month</Label>
    <p className='text-xs font-semibold'>($  /months)</p>
    </div>

    </div>
    {
formData.offer &&
<div className="flex items-center gap-2">
    <TextInput className=' w-24' type='number' name='discountedPrice' value={formData.discountedPrice}  onChange={handleChange} />
    <div>

    <Label htmlFor="price" className='text-sm'>Discounted price a month</Label>
    <p className='text-xs font-semibold'>($  /months)</p>
    </div>

    </div>

    }
    
  
    </div>
    <div className='flex flex-col gap-4 '>
        <h3 className='font-semibold'>Images: The first image will be the cover of the property</h3>
     
        <div className='flex justify-between gap-2'>

         <FileInput className='w-full' name='imageUrls' accept='images/*' onChange={(e)=> setFiles(e.target.files)} multiple={true}/>
         <Button gradientDuoTone={"purpleToBlue"} className=' cursor-pointer' type='button' onClick={handleImageSubmit} as={"div"}>{loading?<><span className=' cursor-pointer'>Uploading...</span> <Spinner size={"sm"}/></>:"Upload"}</Button>
        </div>
        {
          message && <Message type={"success"} message={message}/>
        }
        {
          errormessage && <Message type={"failure"} message={errormessage}/>
        }
        {
          formData.imageUrls.length > 0 && 
          formData.imageUrls.map((url,index)=>{

            return <div key={index} className=' flex justify-between border-2 rounded-md p-2 border-sky-500 items-center'>
               <img src={url} width={'70px'} alt={`listing image-${index}`} height={'40px'}/>
               <p className=' text-red-500 text-lg cursor-pointer' onClick={()=>handleImageDelete(index)}>Delete</p>
            </div>
          })
        }
        <Button gradientDuoTone={"purpleToPink"} type='submit' disabled={submitstate} outline>{submitstate?<><span className=' cursor-pointer'>Updating lists...</span> <Spinner size={"sm"}/></>:"Update Listing"}</Button>
    </div>
</form>
    </div>
  )
}

export default EditListing;
