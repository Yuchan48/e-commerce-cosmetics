require("dotenv").config();
const productsInStock = require("./backend/data/productsInStock");
const connectDB = require("./backend/models/db");
const Product = require("./backend/models/Product");

const userData = require("./backend/data/userData");
const User = require("./backend/models/User");


connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(userData);
    console.log("Data import success");

    process.exit();
  } catch (error) {
    console.error("Error with data import: ", error);
    process.exit(1);
  }
};

/*
const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productsInStock);
    console.log("Data import success");

    process.exit();
  } catch (error) {
    console.error("Error with data import: ", error);
    process.exit(1);
  }
};
*/

importData();

