if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { db } = require("./database/db");
const authRouter = require("./routes/authRoute");
const reviewRouter = require("./routes/reviewRoute");
const productRouter = require("./routes/productRoute");
const errorHandler = require("./middlewares/error");
const ErrorResponse = require("./utils/errorResponse");

const app = express();

// connecting to BD
db();

app.use(express.json())

// router middleware
app.use('/api/auth', authRouter);
app.use("/api/products", productRouter);
app.use("/api/products/:id/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new ErrorResponse("Page Not Found", 404));
});


app.use(errorHandler)
// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening at port ", PORT);
});
