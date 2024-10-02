import React, { useEffect, useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";

import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowmore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [offerlists, setOfferLists] = useState([]);
  const [rentLists, setRentLists] = useState([]);
  const [sellLists, setSellLists] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const getOfferLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list/get?offer=true&limit=4`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data) {
          setOfferLists(response.data);
          getRentLists();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOfferLists();
    const getRentLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list/get?type=rent&limit=4`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data) {
          setRentLists(response.data);
          getSellLists();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getSellLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list/get?type=sell&limit=4`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data) {
          setSellLists(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    if(searchTerm=== null){
      setSearchTerm('');
    }
    console.log(searchTerm);
    urlParams.set("searchTerm", searchTerm);

    navigate(`/search?${urlParams}`);
  };
  return (
    <div className=" mx-auto min-h-screen">
      <div className=" grid sm:grid-cols-2 sm:grid-rows-none gap-2 grid-rows-2 place-content-center sm:h-[500px] home-page">
        <div className=" flex flex-col justify-center items-center">
          <h1 className=" p-4  font-serif font-bold text-2xl sm:text-4xl  heading text-center ">
            Find Your Dream House <br /> at Abiskar RealState <br /> WebApp
          </h1>
          <form
            className=" relative flex text-gray-700"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              onChange={handleChange}
              value={searchTerm}
              name="searchTerm"
              className=" rounded-full w-72"
            />
            <FaSearch className=" absolute right-2 top-3 cursor-pointer  text-lg" />
          </form>
        </div>
        <div className="flex justify-center items-center sm:h-[500px] mx-4 cursor-pointer card">
          <img
            src="https://t4.ftcdn.net/jpg/06/32/57/31/360_F_632573146_A0yW9SlMAMD3gMcaggbey4moP5j18vYX.jpg"
            className=" rounded-full"
            alt=""
          />
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1706177284">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#700bff"
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            fill="#700bff"
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            fill="#700bff"
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      {/* Listing Sections */}

      {offerlists.length > 0 && (
        <div className=" mt-5 pb-6 flex flex-col mx-8 sm:mx-20">
          <h1 className=" text-2xl   font-semibold">Recent Offers</h1>
          <p
            className="text-sm text-teal-400 font-semibold cursor-pointer"
            onClick={() => navigate("/search?offer=true")}
          >
            See More
          </p>
          <div className=" flex sm:flex-row    flex-col gap-3 sm:gap-8   mt-3">
            {offerlists.map((list, index) => {
              return (
                <div
                  key={list._id}
                  className=" flex flex-col w-full sm:h-[320px] h-auto shadow-md border-2 rounded-lg sm:w-[260px] border-teal-400 cursor-pointer card"
                  onClick={() => navigate(`/list/${list._id}`)}
                >
                  <img
                    src={list.imageUrls[0]}
                    alt={`image of ${list.name}`}
                    className=" w-full h-[200px] rounded-t-lg border-b-2"
                  />
                  <div className=" flex  flex-col p-2 justify-center gap-1">
                    <p className=" text-lg font-semibold">
                      {list.name.length > 20
                        ? list.name.slice(0, 30)
                        : list.name}
                      ...
                    </p>
                    <div className=" flex gap-1 items-center text-xs text-green-500">
                      <FaLocationDot />
                      <p>{list.address}</p>
                    </div>
                    <p className=" text-sm text-red-600">
                      ${list.regularPrice}/months
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rent Offer */}

      {rentLists.length > 0 && (
        <div className=" mt-5 pb-6 flex flex-col mx-8 sm:mx-20">
          <h1 className=" text-2xl   font-semibold">Recent Property On Rent</h1>
          <p
            className="text-sm text-teal-400 font-semibold cursor-pointer"
            onClick={() => navigate("/search?type=rent")}
          >
            See More
          </p>
          <div className=" flex sm:flex-row    flex-col gap-3 sm:gap-8   mt-3">
            {rentLists.map((list, index) => {
              return (
                <div
                  key={list._id}
                  className=" flex flex-col w-full sm:h-[320px] h-auto shadow-md border-2 rounded-lg sm:w-[260px] border-teal-400 cursor-pointer card"
                  onClick={() => navigate(`/list/${list._id}`)}
                >
                  <img
                    src={list.imageUrls[0]}
                    alt={`image of ${list.name}`}
                    className=" w-full h-[200px] rounded-t-lg border-b-2"
                  />
                  <div className=" flex  flex-col p-2 justify-center gap-1">
                    <p className=" text-lg font-semibold">
                      {list.name.length > 20
                        ? list.name.slice(0, 30)
                        : list.name}
                      ...
                    </p>
                    <div className=" flex gap-1 items-center text-xs text-green-500">
                      <FaLocationDot />
                      <p>{list.address}</p>
                    </div>
                    <p className=" text-sm text-red-600">
                      ${list.regularPrice}/months
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Property for sale full furnished */}
      {sellLists.length > 0 && (
        <div className=" mt-5 pb-6 flex flex-col mx-8 sm:mx-20">
          <h1 className=" text-2xl   font-semibold">Recent Property On Sell</h1>
          <p
            className="text-sm text-teal-400 font-semibold cursor-pointer"
            onClick={() => navigate("/search?type=sell")}
          >
            See More
          </p>
          <div className=" flex sm:flex-row    flex-col gap-3 sm:gap-8   mt-3">
            {sellLists.map((list, index) => {
              return (
                <div
                  key={list._id}
                  className=" flex flex-col w-full sm:h-[320px] h-auto shadow-md border-2 rounded-lg sm:w-[260px] border-teal-400 cursor-pointer card"
                  onClick={() => navigate(`/list/${list._id}`)}
                >
                  <img
                    src={list.imageUrls[0]}
                    alt={`image of ${list.name}`}
                    className=" w-full h-[200px] rounded-t-lg border-b-2"
                  />
                  <div className=" flex  flex-col p-2 justify-center gap-1">
                    <p className=" text-lg font-semibold">
                      {list.name.length > 20
                        ? list.name.slice(0, 30)
                        : list.name}
                      ...
                    </p>
                    <div className=" flex gap-1 items-center text-xs text-green-500">
                      <FaLocationDot />
                      <p>{list.address}</p>
                    </div>
                    <p className=" text-sm text-red-600">
                      ${list.regularPrice}/months
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
