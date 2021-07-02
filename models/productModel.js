const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  productLocation: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  worth: {
    type: Number,
  },
  location: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
