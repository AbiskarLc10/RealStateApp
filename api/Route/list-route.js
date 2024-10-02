const express = require('express');
const router = express.Router();
const controller = require("../Controller/listing-controller");
const verifyUser = require('../utils/VerifyUser');


router.route("/createList").post(verifyUser,controller.createList)
router.route("/deleteList/:listId").delete(verifyUser,controller.deleteUserList);
router.route("/updateList/:listId").put(verifyUser,controller.updateUserList);
router.route("/getlist/:listId").get(controller.getList);
router.route("/get").get(controller.getListingBasedOnSearch)

module.exports = router;