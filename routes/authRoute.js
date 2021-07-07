const express = require("express");
const { register, login, forget, resetPassword } = require("../controllers/authController");
const multer = require("multer")
const authRouter = express.Router()

const { storage } = require("../cloudinary/index");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});
 

authRouter.post('/register',upload.single('avatar'), register)

authRouter.post("/login", login);

authRouter.post("/forget", forget);

authRouter.put("/resetpassword/:resetToken", resetPassword);

module.exports = authRouter