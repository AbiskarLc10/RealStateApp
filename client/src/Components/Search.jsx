import axios from "axios";
import { Button, Checkbox, Label, Select, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardItem from "./CardItem";
const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [searchItem, setSearchItem] = useState({
    searchTerm: "",
    parking: false,
    offer: false,
    furnished: false,
    order: "desc",
    sort: "createdAt",
    type:"rent"
  });

  const handleChange = (e) => {
    if (
      e.target.name === "parking" ||
      e.target.name === "furnished" ||
      e.target.name === "offer"
    ) {
      setSearchItem({
        ...searchItem,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.name === "sort_order") {
      const value = e.target.value.split("_");
      const sort = value[0];
      const order = value[1];
      setSearchItem({
        ...searchItem,
        sort,
        order,
      });
    } else {
      setSearchItem({
        ...searchItem,
        [e.target.name]: e.target.value,
      });
    }
  };
  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const term = urlParams.get("searchTerm");
    const offer = urlParams.get('offer');
    const type = urlParams.get('type')
    setSearchItem(
      {
        ...searchItem,
        searchTerm:term,
        offer: offer,
        type:type
      }
    )
    const fetchSearchResult = async () => {
      const search = location.search;
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/list/get${search}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data) {
          setLists(response.data);
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    };
    fetchSearchResult();
  }, [location.search]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("order", searchItem.order);
    urlParams.set("sort", searchItem.sort);
    urlParams.set("searchTerm", searchItem.searchTerm);
    urlParams.set("furnished", searchItem.furnished);
    urlParams.set("parking", searchItem.parking);
    urlParams.set("offer", searchItem.offer);

    navigate(`/search?${urlParams}`);
  };
  return (
    <div className=" min-h-screen flex sm:flex-row flex-col p-3">
      <form
        className=" sm:w-[300px] flex flex-col gap-4 sm:border-r-2 sm:pr-4 pt-4"
        onSubmit={handleSubmit}
      >
        <div className=" flex items-center">
          <p className="text-sm font-semibold">Search Term:</p>
          <TextInput
            name="searchTerm"
            value={searchItem.searchTerm}
            onChange={handleChange}
            className="w-full"
            placeholder="Enter Search Term"
          />
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-sm font-semibold">Type:</p>
          <Select className="w-full" name="type" value={searchItem.type} onChange={handleChange}>
            <option value={"rent"}>Rent</option>
            <option value={"sell"}>Sell</option>
            <option value={"all"}>All</option>
          </Select>
        </div>
        <div className="flex gap-3">
          <div className=" flex gap-2 items-center">
            <Checkbox
              name="offer"
              id="offer"
              onChange={handleChange}
              checked={searchItem.offer}
            />
            <Label value="offer" className=" text-sm" />
          </div>
          <div className=" flex gap-2 items-center">
            <Checkbox
              name="parking"
              id="parking"
              onChange={handleChange}
              checked={searchItem.parking}
            />
            <Label value="Parking" className=" text-sm" />
          </div>

          <div className=" flex gap-2 items-center">
            <Checkbox
              name="furnished"
              id="furnished"
              onChange={handleChange}
              checked={searchItem.furnished}
            />
            <Label value="furnished" className=" text-sm" />
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <p className="text-sm font-semibold">Sort:</p>
          <Select className="w-full" name="sort_order" onChange={handleChange}>
            <option value={"createdAt_desc"}>Latest</option>
            <option value={"createdAt_asc"}>Oldest</option>
            <option value={"regularPrice_desc"}>Price high to low</option>
            <option value={"regularPrice_asc"}>price low to high</option>
          </Select>
        </div>
        <Button type="submit" gradientDuoTone={"purpleToPink"} outline>
          Search
        </Button>
      </form>

      <div className=" flex-1">
        <h1 className=" text-2xl font-bold text-center mt-4 sm:mt-0 p-2">
          Listing Results:
        </h1>
        {!loading && lists.length > 0 ? (
          <div className=" flex flex-col  md:flex-wrap gap-8 p-4 md:flex-row ">
            {lists.map((list, index) => {
              return <CardItem  key={list._id} list={list} />;
            })}
          </div>
        ) : (
          <>
          {
            !loading && lists.length === 0 ?
            <h1 className=" text-2xl text-center">No List Results found</h1>:
            <div className=" flex justify-center items-center gap-1">
              <h1 className=" text-2xl">Loading....</h1>
              <Spinner/>
            </div>
              
          }
           
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
