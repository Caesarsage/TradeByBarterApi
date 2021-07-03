const Product = require("../models/productModel");
 
exports.createProduct = async (req, res, next) => {
  const { filename, path } = req.file;
 try {
   const newProduct = {
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
   };
   const product = await Product.create(newProduct);
  //  product.uploader = req.user._id;
   return res.status(200).send({ message: "User created successfully!", product });
 } catch (error) {
   if (error.code === 11000) return res.status(200).send({ message: "product already exist" });
   return res.status(400).send({ message: "unable to create product", error });
 }
};
 
exports.updateProduct = async (req, res, next) => {
 const filter = { _id: req.body.id };
 await Product.findByIdAndUpdate(filter, update);
}
 
 
exports.getProducts = (req, res, next) => {
 
 const pageNo = parseInt(req.query.pageNo);
 const size = 3;
 if (pageNo <= 0 ) {
   return res.status(200).send({ error: true, message: "invalid page number" });
 }
 
 const query = {
   //skip = size * (pageNo - 1),
   //limit = size,
 };
 
 Product.find({}, {}, query)
   .select("-_id -__v -updatedAt")
   .populate("category", "-_id name")
   .exec((err, products) => {
     if (err) return res.status(400).send({ message: "showing order", err });
     return res.status(200).send({ message: "showing all orders in the cart", products });
   });
};
 