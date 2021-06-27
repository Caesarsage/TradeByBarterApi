if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { db } = require("./database/db");

const app = express();

// connecting to BD
db();

app.use(express.json());


app.get('/', (req,res)=>{
  res.status(200).send("welcome to zuri backend team 09 testing")
})
// router middleware

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening at port ", PORT);
});
