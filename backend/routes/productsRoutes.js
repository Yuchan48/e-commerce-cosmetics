let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ bestSeller: true });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "mongoose fetching error" });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "mongoose fetching error" });
  }
});

router.get("/list/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "mongoose fetching error" });
  }
});

module.exports = router;
