import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/Theme/ThemeSlice";
import { stateContext } from "../Context/stateContexts";
const Header = () => {

  const user = useSelector(state=>state.user);
const context = useContext(stateContext);
const navigate = useNavigate();
const {signOutUser} = context;
const [searchTerm,setSearchTerm] = useState('');
  const {currentUser} = user;
  const {theme} = useSelector(state=>state.theme)
  const location = useLocation();
  const [acive, setActive] = useState();
const dispatch = useDispatch();

useEffect(()=>{
  const urlParams = new URLSearchParams(location.search);
  const searchData = urlParams.get("searchTerm")
  setSearchTerm(searchData);


},[location.search])
const handleSubmit = (e) =>{

  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  
  if(searchTerm===null){
    setSearchTerm('');
  }
  urlParams.set('searchTerm',searchTerm);

  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
}
  useEffect(()=>{
setActive(location.pathname);
  },[location.pathname])

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 mx-auto dark:text-gray-600 shadow-sm ">
      <Navbar>
        <Navbar.Brand >
          <h1 className=" text-gray-500 text-lg font-bold cursor-pointer" onClick={ ()=> navigate("/")}>
            Real
            <span className="text-gray-800 dark:text-gray-300">Estate</span>
          </h1>
        </Navbar.Brand>
       <form className="flex items-center" onSubmit={handleSubmit} >
        <TextInput type="text"  value={searchTerm} placeholder="Search..." onChange={(e)=> setSearchTerm(e.target.value)} className="text-xl w-20 sm:w-auto md:block" rightIcon={FaSearch} />
    
       </form>

        <div className=" flex md:order-2 hover:shadow-md hover:shadow-white bg-gray-400 dark:bg-slate-700 dark:text-gray-200 p-3 rounded-full cursor-pointer"  onClick={()=> dispatch(toggleTheme())}>
          {
            theme === "light"?
            <FaSun/>: <FaMoon/>

          }
        </div>
        <div className=" sm:flex md:order-3 hidden ">
          {

            currentUser?
            <Dropdown arrowIcon={false} inline label={<Avatar img={currentUser.profilePicture} rounded/>}>
            <Dropdown.Header>
            <span className="block text-sm">{currentUser.username}</span>
            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item >
              <Link to={"/profile"}>  Profile</Link>
            
              </Dropdown.Item>
            <Dropdown.Item onClick={signOutUser}>
              SignOut
            </Dropdown.Item>

          </Dropdown>:
          <>
          <Button gradientDuoTone={"purpleToPink"} outline>
            <Link to={"/signup"}>Sign up</Link>
            </Button>
          </>
          }
        
        </div>
        <Navbar.Toggle />

        <Navbar.Collapse className="text-gray-600 cursor-pointer">
          <Navbar.Link as={"div"}  className=" cursor-pointer md:text-md" active={acive==="/"}>
            <Link to={"/"}>Home</Link>

          </Navbar.Link>
          <Navbar.Link as={"div"} className=" cursor-pointer md:text-md">
          <Link to={"/about"}>About</Link>
          </Navbar.Link>
          <Navbar.Link as={"div"} className=" cursor-pointer sm:hidden">
          <Link to={"/signup"}>Sign up</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
