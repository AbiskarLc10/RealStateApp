const express = require('express');

const router = express.Router();
const controller = require('../Controller/auth-controller');


router.route("/signup").post(controller.signupUser);
router.route("/signin").post(controller.signinUser);
router.route("/signout").delete(controller.signOut);
router.route("/google").post(controller.googleSignup);


module.exports = router;