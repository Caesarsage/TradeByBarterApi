const Product = require("../models/productModel");
const Review = require("../models/reviewModel");


module.exports.createReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const newReview = new Review(req.body.review);
    if(!newReview){
      res.status(401).json({msg: "review not found", data:null})
    }
    // review.author = req.user._id;
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
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
  } catch (error) {
    res.status(500).json({ msg: "error occur!!!", data: error });
  }
};
