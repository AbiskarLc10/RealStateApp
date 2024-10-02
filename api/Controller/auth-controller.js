const User = require("../Database/Model/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next({
        status: 400,
        message: "Field must not be empty",
        extraDetails: "Error occurred",
      });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return next({ status: 400, message: "User Already created" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const createduser = await User.create({
      username,
      email,
      password: hashpassword,
    });

    if (createduser) {
      return res
        .status(200)
        .json({ message: "User created successfully", createduser });
    }
  } catch (error) {
    next(error);
  }
};

const signinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next({ status: 400, message: "Fill the email field" });
    }
    if (!password) {
      return next({ status: 400, message: "Fill the password field" });
    }

    const userData = await User.findOne({ email: email });
    if (!userData) {
      return next({
        status: 404,
        message: "User not found",
        extraDetails: "Enter valid credentials",
      });
    }

    const hashPassword = userData.password;

    const verifyPassword = await bcrypt.compare(password, hashPassword);

    if (!verifyPassword) {
      return next({
        status: 401,
        message: "Enter correct password",
        extraDetails: "Enter valid credentials",
      });
    }

    const token = jwt.sign(
      { id: userData._id, email: userData.email },
      process.env.PRIVATEKEY
    );

    const { password: pass, ...rest } = userData._doc;
    return res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signOut = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next({ status: 404, message: "Token Not verified" });
    }
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "SignOut Successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const googleSignup = async (req, res, next) => {
  try {
    const { username, email, profilePicture } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      const token = jwt.sign(
        { id: userExist._id, email: userExist.email },
        process.env.PRIVATEKEY
      );

      const { password: pass, ...rest } = userExist._doc;

      return res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const hashPassword = await bcrypt.hash(generatedPassword, 10);
      const newuser = await User.create({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(36).slice(-4),
        email,
        password: hashPassword,
        profilePicture,
      });

      if (!newuser) {
        return next({ status: 400, message: "Unable to create new user" });
      }
      const token = jwt.sign(
        { id: newuser._id, email: newuser.email },
        process.env.PRIVATEKEY
      );

      const { password: pass, ...rest } = newuser._doc;
      return res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signupUser, signinUser, signOut, googleSignup };
