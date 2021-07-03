const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductController = require("../controllers/productController");
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
 
router.post("/", upload.single("image"), ProductController.createProduct);
 
router.get("/", ProductController.getProducts);
 
module.exports = router;
 
