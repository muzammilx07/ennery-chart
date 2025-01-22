const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI

    if (!dbURI){
      console.error("MongoDB URI  is missing from .env file");
      process.exit(1);
    }
    await mongoose.connect(dbURI); 
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:",err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
