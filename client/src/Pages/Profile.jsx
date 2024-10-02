import React, { useContext, useState, useRef, useEffect } from "react";
import { Alert, Button, FileInput, TextInput, Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../Redux/Theme/userSlice";
import { CiWarning } from "react-icons/ci";
import { stateContext } from "../Context/stateContexts";
import { CircularProgressbar } from "react-circular-progressbar";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FaArrowDown, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Message from "../Components/Message";
import { Link } from "react-router-dom";
const Profile = () => {
  const fileRef = useRef(null);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [togglemodal, setToggleModal] = useState(false);
  const [file, setFile] = useState(undefined);
  const [lists, setLists] = useState([]);
  const [showList, setShowList] = useState(false);
  const [fileerror, setFileError] = useState(null);
  const { signOutUser } = useContext(stateContext);
  const [action, setAction] = useState("");
  const [message, setMessage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formdata, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    profilePicture: currentUser.profilePicture,
    password: "",
  });
  useEffect(() => {
    getUserLists();
    if (file) {
      uploadFileTask();
    }
  }, [file]);
  console.log(lists);
  if (fileerror || message) {
    setTimeout(() => {
      setFileError(null);
      setMessage(null);
      setImageUploadProgress(null);
    }, 3000);
  }

  const deleteUser = async () => {
    try {
      dispatch(signOutStart());
      const response = await axios.delete(
        `http://localhost:8000/api/user/deleteUser/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log(response);
        dispatch(signOutSuccess());
      }
    } catch (error) {
      dispatch(signOutFailure(error.response.data.message));
    }
  };
  const uploadFileTask = () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
        console.log(`file upload is ${Math.round(progress)}% completed`);
      },
      (error) => {
        console.log(error);
        setFileError(`File size is greater than 2mb`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formdata,
            profilePicture: downloadUrl,
          });
          setImageUploadProgress(null);
        });
      }
    );
  };

  const getUserLists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/getLists/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log("lists fetched successfully");
        setLists(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.put(
        `http://localhost:8000/api/user/updateUser/${currentUser._id}`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setMessage("Profile Updated Successfully");
        setFormData({
          ...formdata,
          password: "",
        });
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      dispatch(signInFailure());
    }
  };

  const toggleShowPassword = () => {
    setShow(!show ? true : false);
  };
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleListDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/list/deleteList/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setMessage(response.data.message);
        setLists(
          lists.filter((list) => {
            return list._id !== id;
          })
        );
      }
    } catch (error) {
      setFileError(error.response.data.message);
      console.log(error);
    }
  };
  console.log(file);
  return (
    <>
      <div className="max-w-xl mx-auto w-full min-h-screen pb-3">
        <h1 className="text-3xl text-center  mt-8 font-semibold">
          User Profile
        </h1>

        <form className="mx-2 flex flex-col gap-2 mt-4">
          <div
            className=" relative w-32 h-32 cursor-pointer mx-auto  shadow-md overflow-hidden rounded-full"
            onClick={() => fileRef.current.click()}
          >
            <FileInput
              ref={fileRef}
              onChange={(e) => setFile(e.target.files[0])}
              className=" hidden"
            />
            {imageUploadProgress && (
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
                strokeWidth={4}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    textAlign: "center",
                  },
                  path: {
                    stroke: `rgba(28,89,128,${imageUploadProgress / 100})`,
                  },
                }}
              />
            )}
            <img
              src={formdata.profilePicture}
              alt="Profile"
              className={`rounded-full w-full h-full object-cover text-center border-gray-100 border-4 ${
                imageUploadProgress && imageUploadProgress < 100
                  ? " opacity-60"
                  : "opacity-100"
              }`}
            />
          </div>

          <TextInput
            type="text"
            name="username"
            placeholder="UserName"
            onChange={handleChange}
            value={formdata.username}
          />
          <TextInput
            type="email"
            name="email"
            placeholder="UserEmail"
            onChange={handleChange}
            value={formdata.email}
            disabled={true}
          />
          <div className=" relative">
          <TextInput
          className=" w-full"
            type={show ? "text" : "password"}
            name="password"
            value={formdata.password}
            placeholder="Enter password"
            onChange={handleChange}
          />
          {
            show? <FaEyeSlash onClick={toggleShowPassword} className=" cursor-pointer absolute right-2 top-3"/>:
          <FaEye  onClick={toggleShowPassword} className=" cursor-pointer absolute right-2 top-3"/>
          }
          </div>
         
          <div>
           
          </div>

          <Button
            gradientDuoTone={"purpleToBlue"}
            onClick={handleSubmit}
            type="submit"
            outline
          >
            Update Profile
          </Button>
          <Button color="success" outline>
            <Link to={"/create-listing"}>Create Listing</Link>
          </Button>
          {fileerror && <Message message={fileerror} type={"failure"} />}
          {message && <Message message={message} type={"success"} />}
        </form>

        <div className="mx-2 mt-2 flex justify-between">
          <p
            className=" text-red-600  cursor-pointer"
            onClick={() => {
              setAction("signout");
              setToggleModal(true);
            }}
          >
            Sign Out
          </p>
          <p
            className=" text-red-600 cursor-pointer"
            onClick={() => {
              setToggleModal(true);
              setAction("delete your account");
            }}
          >
            Delete Account
          </p>
        </div>
        {
  lists.length >0 &&
  <div className="mt-2 flex justify-center text-sm items-center gap-1">
          <p
            className="text-green-700 cursor-pointer  text-center"
            onClick={() => setShowList(showList ? false : true)}
          >
            {showList ? "Hide Listing" : "Show Listings"}
          </p>
          <FaArrowDown color="green" />
        </div>

        }
        
        {showList && lists.length > 0 && (
          <>
            <div className=" flex flex-col gap-2 my-2 mx-2">
              <h2 className="text-center text-2xl font-semibold">
                Your Listings
              </h2>
              {lists.map((list, index) => {
                return (
                  <>
                    <div
                      key={list._id}
                      className=" flex gap-2  items-center  border-2 rounded-md border-teal-400 dark:border-gray-300 p-1 transition-all shadow-lg cursor-pointer"
                    >
                      <img
                        src={list.imageUrls[0]}
                        className=" rounded-lg"
                        width={"150px"}
                        height={"15hover:0px"}
                        alt={`image of list id ${list._id}`}
                      />
                      <div className=" flex justify-between flex-1 items-center">
                      <Link
                        to={`/list/${list._id}`}
                        className=" text-gray-700 text-xl dark:text-gray-200 text-start font-semibold hover:underline"
                      >
                        {list.name.length > 30
                          ? list.name.slice(0, 30)
                          : list.name}
                      </Link>
                      <div className=" flex flex-col justify-center items-center gap-1">
                        <Link to={`/editlist/${list._id}`} className=" text-green-500 hover:underline text-lg cursor-pointer">
                          Edit
                        </Link>
                        <p
                          className=" text-red-600 hover:underline text-lg cursor-pointer"
                          onClick={() => handleListDelete(list._id)}
                        >
                          delete
                        </p>
                      </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}

        {/* Modal */}

        <Modal
          size={"md"}
          dismissible
          show={togglemodal}
          onClose={() => setToggleModal(false)}
          popup
        >
          <Modal.Header className=" text-center">
            Are you sure you want to {action}?
          </Modal.Header>
          <Modal.Body>
            <div className=" flex justify-center mt-1">
              <CiWarning className=" w-24 h-20 text-red-500 cursor-pointer" />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-between pt-0">
            <Button
              color="failure"
              onClick={() => {
                action === "signout" ? signOutUser() : deleteUser();
              }}
            >
              Yes
            </Button>
            <Button
              className=" bg-slate-500"
              onClick={() => setToggleModal(false)}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
