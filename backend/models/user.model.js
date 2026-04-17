const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
  },
   isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
});

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

  } catch (error) {
    throw  error;
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;