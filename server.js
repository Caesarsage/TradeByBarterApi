if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { db } = require("./database/db");
const authRouter = require("./routes/authRoute");

const app = express();

// connecting to BD
db();

app.use(express.json());


// router middleware
app.use('/api/auth', authRouter);

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening at port ", PORT);
});
