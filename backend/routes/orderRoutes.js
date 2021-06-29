let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { isAuth, isAdmin } = require("../util");

router.post("/", isAuth, async (req, res) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createOrder = await order.save();
      console.log("order saved");
      res.send({ message: "Order Saved", order: createOrder });
    }
  } catch (error) {
    res.status(500).send({ message: "mongodb save data error" });
  }
});

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name");
    //console.log("orders:", orders);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "mongodb server error" });
  }
});

router.get("/:id", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: "Order not found" });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send({ message: "Order Delete Success", order: order });
  } catch (error) {
    res.status(500).send({ message: "Order not found" });
  }
});

router.put("/:id/pay", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.send({ message: "order paid successful", order: updatedOrder });
  } catch (error) {
    res.status(500).send({ message: "mongodb save data error" });
  }
});

router.put("/:id/deliver", isAuth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.send({ message: "Order Delivered", order: updatedOrder });
  } catch (error) {
    res.status(404).send({ message: "Order Not Found" });
  }
});

router.get("/user/list", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "data not found" });
  }
});

module.exports = router;
