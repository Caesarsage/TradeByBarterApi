// chalk is a package that just add colors to output, nothing special. Don't get confuse with it.
const chalk = require("chalk");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports.db = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const connectMongoose = await mongoose.connect(
      process.env.MONGO_URL,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    if (!connectMongoose) {
      console.log(chalk.red("Database failed to connect"));
    }
    console.log(chalk.green("Database Connected correctly"));
  } catch (err) {
    console.log("error occur");
    console.log(err);
  }
};
