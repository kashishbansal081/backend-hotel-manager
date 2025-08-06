const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB;

const connectDB = async () => {
    await mongoose
      .connect(mongoUrl)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
};

module.exports = {connectDB}