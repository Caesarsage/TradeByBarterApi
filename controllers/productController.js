const { cloudinary } = require("../cloudinary");
const Product = require("../models/productModel");
const ErrorResponse = require("../utils/errorResponse");
 
exports.createProduct = async (req, res, next) => {
  const { filename, path } = req.file;
 try {
   const product = await Product.create({
     name: req.body.name,
     description: req.body.description,
     image: {
       filename,
       url: path,
     },
     quantity: req.body.quantity,
     productLocation: req.body.productLocation,
     worth: req.body.worth,
     category: req.body.category,
     uploader: req.user.id
   });
   if(!product){
     return next(new ErrorResponse("unable to create product",400))
   }
   return res.status(200).send({ msg: "Product created successfully!", date:product });
 } catch (error) {
   if (error.code === 11000) return res.status(200).send({ message: "product already exist" });
   next(error)
 }
};

exports.updateProduct = async (req, res, next) => {
  try {
   const { id } = req.params;
   const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
   product.image = req.file;
   await product.save();
   if (!product) {
     return next(new ErrorResponse("product not found", 401));
   }
   res.status(200).json({ msg: "successful", data: product }); 
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
   const { id } = req.params;
   const product = await Product.findByIdAndDelete(id);
   if (!product) {
     return next(new ErrorResponse("product not found", 401));
   }
  await cloudinary.uploader.destroy(product.image.filename);
   res.status(200).json({ msg: "successful", data: product }); 
  } catch (error) {
    next(error)
  }
}

exports.getSingleProduct = async (req,res,next)=>{
  try {
    const {id}= req.params;
    const product = await Product.findById(id).populate("uploader");
    if (!product) {
      return next(new ErrorResponse("product not found", 404));
    }
    res.status(200).json({msg: 'successful', data: product})
  } catch (error) {
    next(error)
  }
}

exports.getProducts = async (req, res, next) => {
  const { page = 1, limit = 20, name } = req.query;
  try{
  let s = "";
  if (name) {
    s = req.query.name;
  } 
  const regex = new RegExp(s, "i");

  const products = await Product.find({ name: { $regex: regex } }).limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ $natural: -1 })
    .populate("uploader").exec()
  
    if(products){
      res.status(200).json({msg:"all products", data: products})
    }
    if(!products){
      return next(new ErrorResponse('no product', 400))
    }
  }catch(error){
    next(error)
  }
};
 