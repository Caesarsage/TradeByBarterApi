const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid mail",
    ]
  },
  phoneNumber: {
    type: Number,
    required: true,
    min: [7, "number must not start with 0 and less than 7 digit"],
  },
  avatar: {
    type: String,
    default: "",
  },
  location: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "regular"],
    default: "regular",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


// hash the password
userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// create a match password method
userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate reset password token
userSchema.methods.getRestPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex")
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60*1000);
  return resetToken
}

const User = mongoose.model("User", userSchema);

module.exports = User;