const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.register = async(req,res)=>{
  try {
    const {firstName, lastName, email, phoneNumber, username, avatar, location, role,password, isAdmin} = req.body;
    // checking for email and username uniqueness
    const uniqueEmail = await User.findOne({email});
    const uniqueUsername = await User.findOne({username})
    uniqueEmail && res.status(401).json({ msg: "email already exist", data: null });
    uniqueUsername && res.status(401).json({ msg: "username already exist", data: null });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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
      password: hashedPassword
    });

    // create a token
    const token = await jwt.sign(
      {
        id: user.id,
        firstName : user.firstName,
        lastName : user.lastName,
        username: user.username,
        email : user.email,
        phoneNumber : user.phoneNumber,
        avatar : user.avatar ,
        location : user.location ,
        role : user.role ,
        isAdmin : user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
     if (token)
       return res
         .status(200)
         .json({ msg: "login successfully", data: user, token });

  } catch (error) {
    res.status(500).json({ msg: "server error", data: error });
  }
}

module.exports.login = async (req, res) => {
  try {
    const { password, username, isAdmin } = req.body;
    const user = await User.findOne({ username });
    !user && res.status(401).json({ msg: "user not found", data: null });

    const match = await bcrypt.compare(password, user.password);
    !match && res.status(401).json({ msg: "incorrect credential", data: null });

    const token = jwt.sign(
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
  } catch (error) {
    res.status(500).json({ msg: "server error", data: error });
  }
};
