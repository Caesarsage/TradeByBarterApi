const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");

const sendMail = require("../utils/sendMail");

module.exports.register = async (req, res, next) => {
  const {
    firstName,lastName,email,phoneNumber,username,avatar,location,role,password,isAdmin} = req.body;
  try {
    // checking for email and username uniqueness
    const uniqueEmail = await User.findOne({ email });
    const uniqueUsername = await User.findOne({ username });
    uniqueEmail && next(new ErrorResponse("email already exist", 401) );
    uniqueUsername && next(new ErrorResponse("user already exist", 401));

    // create a new user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      avatar,
      location,
      role,
      isAdmin,
      password,
    });

    // create a token
    const token = await jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    if (token)
      return res
        .status(200)
        .json({ msg: "register successfully", data: user, token });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({ username }).select("+password");
    !user && next(new ErrorResponse("User not found", 404));

    const match = await user.matchPasswords(password);
    !match && next(new ErrorResponse("Invalid credentials", 401));

    const token = await jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        location: user.location,
        role: user.role,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    if (token)
      return res
        .status(200)
        .json({ msg: "login successfully", data: user, token });
    if (!token) return new ErrorResponse("Login error, try again", 404);
  } catch (error) {
    next(error)
  }
};

module.exports.forget = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("user not found", 402))
    }
    const resetToken = user.getRestPasswordToken();
    await user.save();
    console.log(resetToken)

    const resetUrl = `http:localhost:3000/passwordReset/${resetToken}`;
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to the link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      // send the email
      await sendMail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      
      res
        .status(200)
        .json({ data: 'success', msg: "Email sent, check your mail box" });
    } catch (error) { 
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined;
      await user.save();
      console.log(error);
      return next(new ErrorResponse("Email could not be send", 500));
    }
  }catch (error) {
    next(error)
  }
};


exports.resetPassword = async (req, res, next) => {
  // recreate resetPasswordToken
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset token(expired)", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(201).json({
      success: true,
      data: "Password Reset Success",
    });
  } catch (error) {
    next(error);
  }
};