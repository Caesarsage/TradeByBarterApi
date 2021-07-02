const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    default: "uncategorized"
  },
});

const Category = mongoose.model("Category", categorySchema);