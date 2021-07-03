if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { db } = require("../database/db");
const User = require("../models/userModel");


db()

const seedAdmin = async () => {
  // await User.deleteMany();
  try {
    const admin = await User.findOne({ isAdmin: true });
    if (admin) return "admin account already exists";

    const newAdmin = await User.create({
      firstName: "Super Admin",
      lastName: "team09",
      role: "admin",
      phoneNumber: 2348129688317,
      username: process.env.ADMIN_NAME,
      isAdmin: true,
      email: "projectzuriteam9@gmail.com",
      password: process.env.ADMIN_PASSWORD,
    });

    const jwtToken = await jwt.sign(
      {
        id: newAdmin.id,
        username: newAdmin.username,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        role: newAdmin.role,
        email: newAdmin.email,
        isAdmin: newAdmin.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    if (jwtToken)
      console.log({ msg: "register successfully", token: jwtToken, newAdmin });
  } catch (error) {
    console.log("error ===>", error);
    return console.log({ msg: "Error", token: error });
  }
};

seedAdmin().then(() => {
  mongoose.connection.close();
});
