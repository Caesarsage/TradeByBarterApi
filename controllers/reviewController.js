const Product = require("../models/productModel");
const Review = require("../models/reviewModel");


module.exports.createReview = async (req, res) => {
  const {body, rating, author} = req.body
  try {
    const product = await Product.findById(req.params.id);
    const newReview = new Review({
      body,
      rating,
      author: req.user.id
    });
    if(!newReview){
      res.status(401).json({msg: "review not found", data:null})
    }
    product.reviews.push(newReview);
    await newReview.save();
    await product.save();
    res.status(201).json({ msg: "review added", data: newReview });
  } catch (error) {
    res.status(500).json({msg:"error occur!!!", data: error})
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const product = await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
  if(review) res.status(200).json({msg:'successful', data:review})    
  } catch (error) {
    res.status(500).json({ msg: "error occur!!!", data: error });
  }
};
