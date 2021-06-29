let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const Product = require("../models/Product");
const { isAuth, isAdmin } = require("../util");

router.post("/", isAuth, isAdmin, async (req, res) => {
  console.log(req.body);
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      bestSeller: req.body.bestSeller,
      subTitle: req.body.subTitle,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      imageUrl: req.body.imageUrl,
    });

    const createdProduct = await product.save();
    res.send({ message: "product created", product: createdProduct });
  } catch (error) {
    res.status(500).json({ message: "couldn't save data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "data fetching error" });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.bestSeller = req.body.bestSeller || product.bestSeller;
    product.subTitle = req.body.subTitle || product.subTitle;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.imageUrl = req.body.imageUrl || product.imageUrl;
    const updatedProduct = await product.save();
    res.send({ message: "product updated", product: updatedProduct });
  } catch (error) {
    res.status(404).send({ message: "Product Not Found" });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: "product deleted" });
  } catch (error) {
    res.status(404).send({ message: "Product Not Found" });
  }
});

module.exports = router;
