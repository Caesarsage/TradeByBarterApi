const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type:String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  phoneNumber:{
    type: Number,
    required: true,
    min: 7
  },
  avatar:{
    type: String,
    default:""
  },
  location:{
    type: String
  },
  role: {
    type: String,
    enum:['admin', 'regular'],
    default: 'regular'
  },
  isAdmin:{
    type: Boolean,
    default: false
  } 
});

const User = mongoose.model("User", userSchema);

module.exports = User;