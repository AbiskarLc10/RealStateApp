const User = require("../Database/Model/User");
const List = require("../Database/Model/List");
const bcrypt = require("bcrypt");

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const { id } = req.user;

    if (userId !== id) {
      return next({ status: 401, message: "Access Denied" });
    }

    const dataToBeUpdated = {};
    const { username, profilePicture, password } = req.body;

    if (username) {
      dataToBeUpdated.username = username;
    }
    if (password) {
      const hashpassword = await bcrypt.hash(password, 10);

      dataToBeUpdated.password = hashpassword;
    }
    if (profilePicture) {
      dataToBeUpdated.profilePicture = profilePicture;
    }

    const updatedData = await User.findByIdAndUpdate(userId, dataToBeUpdated, {
      new: true,
    });

    if (!updatedData) {
      return next({ status: 400, message: "Failed to update user" });
    }
    console.log(updatedData);

    const { password: pass, ...rest } = updatedData._doc;
    console.log(rest);

    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


const deleteUser = async(req,res,next) =>{

    

    try {

        const {id} = req.user;
        const userId = req.params.userId;

        if(id!==userId){
            return next({status:401,message:"Unauthorized Access",extrDetails:"Unable to delete the account"});
        }
        
        const deletedUser = await User.findByIdAndDelete(userId);
        console.log("hello");
        if(!deletedUser){
            return next({status:500,message:"Unable to delete the user"});
        }

        const {password:pass,...rest} = deletedUser._doc;
         return res.clearCookie('token').status(200).json({message:"User deleted Successfully",rest});

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUserLists = async (req,res,next) =>{


  try {
      
      const {id} = req.user;
      const userId = req.params.userId;

      if(id!==userId){
          return next({status:401,message:"Unauthorized user"});
      }

      const lists = await List.find({userRef:userId});
      if(!lists){
          return next({status:500,message:"Server Error Occurred"});
      }

      return res.status(200).json(lists);
  } catch (error) {
      next(error);
  }
}


const getListUserInfo = async (req,res,next ) =>{

  try {

    const userId = req.params.userId;

    const user = await User.findById(userId);

    if(!user){
      return next({status:404,message:"LandLord Not Found"});
    }

    const {password:pass,...rest} = user._doc;


    return res.status(200).json(rest);
    
  } catch (error) {
    next(error)
  }
}

module.exports = { updateUser,deleteUser,getUserLists,getListUserInfo};
