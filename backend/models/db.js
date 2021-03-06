require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.set("debug", true);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("mongodDB connection success");
  } catch (error) {
    console.error("mongoDB connection FAIL");
    process.exit(1);
  }
};

module.exports = connectDB;
