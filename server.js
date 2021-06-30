if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { db } = require("./database/db");
const authRouter = require("./routes/authRoute");
const reviewRouter = require("./routes/reviewRoute");

const app = express();

// connecting to BD
db();

app.use(express.json());


// router middleware
app.use('/api/auth', authRouter);
app.use("/api/products/:id/reviews", reviewRouter);
// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening at port ", PORT);
});
