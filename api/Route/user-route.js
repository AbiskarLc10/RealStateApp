const express = require('express');

const router = express.Router();
const controller = require("../Controller/user-controller");
const verifyUser = require('../utils/VerifyUser');


router.route("/updateUser/:userId").put(verifyUser,controller.updateUser);
router.route("/deleteUser/:userId").delete(verifyUser,controller.deleteUser)
router.route("/getLists/:userId").get(verifyUser,controller.getUserLists)
router.route("/:userId").get(verifyUser,controller.getListUserInfo);
module.exports = router;