const express = require("express");
const { showUser, editUser, getAllUser} = require("../controllers/userController");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const {authenticateUser, checkIfAdmin} = require("../middlewares/auth")

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

const userRouter = express.Router();

userRouter.get("/:id", authenticateUser, showUser);

userRouter.put("/:id", upload.single('image'), authenticateUser, editUser);

userRouter.get("/", authenticateUser, checkIfAdmin, getAllUser);

module.exports = userRouter;