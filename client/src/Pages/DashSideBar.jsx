import React from 'react'
import { Sidebar, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie,HiUser } from "react-icons/hi";
import { Link } from 'react-router-dom';
const DashSideBar = ({tab}) => {
  return (

    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <Sidebar.ItemGroup className='cursor-pointer'>
          <Sidebar.Item icon={HiChartPie} active={tab==="dashboard"}>
              Dashboard
          </Sidebar.Item>
          <Sidebar.Item  icon={HiUser} active={tab==="profile"} as={"div"}>
           <Link to={"/dashboard?tab=profile"}>Profile</Link> 
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

export default DashSideBar;
