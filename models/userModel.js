const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    donate :{
      type : Boolean,
      default : true
    },
    gender :{
      type : String,
      required : true
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("bloods", userSchema);

module.exports = userModel;
