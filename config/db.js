require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to MongoDB");
  } catch (error) {
    console.log("failed to connect to MongoDB");
    process.exit(1);
  }
};
module.exports = connectDB;
