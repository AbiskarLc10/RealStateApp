const List = require("../Database/Model/List");
const User = require("../Database/Model/User")
const createList = async (req, res, next) => {
  try {
    const list = await List.create(req.body);

    if (!list) {
      return next({ status: 400, message: "Failed to create a property data" });
    }

    return res
      .status(200)
      .json({ message: "Property added successfully", list });
  } catch (error) {
    next(error);
  }
};
const deleteUserList = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const listId = req.params.listId;

    const findList = await List.findById(listId);

    if (!findList) {
      return next({ status: 404, message: "Failed to get the list" });
    }
    if (findList.userRef === userId) {
      const deletedList = await List.findByIdAndDelete(listId);

      if (!deletedList) {
        return next({ status: 400, message: "Failed to delete the list" });
      }

      return res.status(200).json({ message: "List deleted Successfully" });
    } else {
      return next({ status: 401, message: "Unauthorized user" });
    }
  } catch (error) {
    next(error);
  }
};

const updateUserList = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    const listId = req.params.listId;

    const listToBeUpdated = await List.findById(listId);

    if (!listToBeUpdated) {
      return next({ status: 404, message: "List not Found" });
    }

    if (userId === listToBeUpdated.userRef) {
      const updatedList = await List.findByIdAndUpdate(listId, data, {
        new: true,
      });

      if (!updatedList) {
        return next({ status: 400, message: "Unable to update the list" });
      }

      return res
        .status(200)
        .json({ message: "List updated Successfully", list: updatedList });
    } else {
      return next({
        status: 401,
        message: "You are not allowed to delete the list",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    
    const listId = req.params.listId;

    const list = await List.findById(listId);

    if (!list) {
      return next({ status: 404, message: "List not Found" });
    }

    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const getListingBasedOnSearch = async (req,res,next) =>{

  try {
    
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    let offer = req.query.offer;
    let furnished = req.query.furnished;
    let parking = req.query.parking;
  let  type = req.query.type;

    const searchTerm = req.query.searchTerm || "";

   
    if(offer === undefined || offer === "false" || offer===null){

      offer = {$in : [true,false]}
    }
    if(furnished === undefined || furnished === "false"){

      furnished = {$in : [true,false]}
    }
    if(parking === undefined || parking === "false"){

      parking = {$in : [true,false]}
    }
    if(type === undefined || type === "false"){

      type = {$in : ["rent","sell"]}
    }

  
    const lists = await List.find({
      name: {$regex : searchTerm,$options:'i'},
      offer,
      parking,
      furnished,
      type
    }).sort({
      [sort]: order
    }).limit(limit).skip(startIndex);


    
    return res.status(200).json(lists);
  } catch (error) {
    next(error)
  }
}



module.exports = { createList, deleteUserList, updateUserList,getList,getListingBasedOnSearch };
