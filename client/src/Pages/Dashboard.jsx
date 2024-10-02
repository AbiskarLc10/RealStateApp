import {React, useEffect, useState }from 'react'
import {useLocation} from 'react-router-dom';
import DashSideBar from './DashSideBar';
import Profile from './Profile';
const Dashboard = () => {

  // const [tab,setTab] = useState();


  // useEffect(()=>{
  //   const urlParams = new URLSearchParams(location.search);
  
  //   const tabFromUrl = urlParams.get('tab');

  //   setTab(tabFromUrl);

  // },[location.search])

  
  return (
    <div className='min-h-screen flex md:flex-row flex-col'>
      {/* <div className='md:w-56'>
        <DashSideBar tab={tab}/>
      </div>

{

tab === "profile" ?<Profile/>:<></>

}
       
           */}
      
    </div>
  )
}

export default Dashboard
