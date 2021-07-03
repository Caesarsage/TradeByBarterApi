const express = require("express");
const { register, login, forget, resetPassword } = require("../controllers/authController");

const authRouter = express.Router()

authRouter.post('/register', register)

authRouter.post("/login", login);

authRouter.post("/forget", forget);

authRouter.put("/resetpassword/:resetToken", resetPassword);

module.exports = authRouter