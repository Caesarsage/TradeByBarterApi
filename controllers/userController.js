const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

module.exports.showUser = async (req,res,next)=>{
  try {
  const { id } = req.params;
  const user = await User.findById(id)
  const products = await Product.find({'uploader': user._id });
  if(!user) next(new ErrorResponse("User not found", 404))
  res.status(200).json({user, products, msg:"user and his/her product found"})
  console.log(user);
  console.log(products)
  } catch (error) {
    next(error)
  }
}

module.exports.editUser = async(req,res,next)=>{
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body,{new:true});
    user.avatar = req.file;
    await user.save();
    res.status(200).json({data: user, msg:"user edited"})
  } catch (error) {
    next(error)
  }
}

module.exports.getAllUser = async(req,res,next)=>{
  try {
    const user = await User.find({})
    if(!user){
      return next(new ErrorResponse('no user found', 404))
    }
  } catch (error) {
    return next(error)
  }
}