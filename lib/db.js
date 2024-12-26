const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connect = async () => {
  console.log("Connecting to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connect;