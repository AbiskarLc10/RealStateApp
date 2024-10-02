import axios from 'axios';
import { createContext } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { signOutStart,signOutSuccess,signOutFailure } from '../Redux/Theme/userSlice';

export const stateContext = createContext();


 export const Contexts = (props) =>{

    const dispatch = useDispatch();

 const signOutUser = async () =>{
    try {
        dispatch(signOutStart());
        
        const response =  await axios.delete("http://localhost:8000/api/auth/signout",
    {
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true,
        
    })
        
    if(response){
      dispatch(signOutSuccess());
     console.log(response);
    }
    } catch (error) {
        console.log(error);
        dispatch(signOutFailure(error.response.data.message));
    }
 }
    return(
<stateContext.Provider value={{signOutUser}}>
{props.children}
</stateContext.Provider>

    )
}


