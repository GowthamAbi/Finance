const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone:
  {
    type:Number,
    required: true,
  }

  

});

module.exports = mongoose.model("User", userSchema, "Users");
