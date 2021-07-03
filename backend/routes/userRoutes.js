let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const User = require("../models/User");
const { generateToken, isAuth, isAdmin } = require("../util");
const bcrypt = require("bcrypt");

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Users not found" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } else {
      res.status(401).send({ message: "invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "invalid email or password" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "There's already an account with this email address" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "user not found" });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = user.save();
    res.send({ message: "Updated User", user: updatedUser });
  } catch (error) {
    res.status(500).send({ message: "couldn't Update User" });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.isAdmin) {
      res.status(400).send({ message: "You cannot delete Admin User" });
    } else {
      const deleteUser = await user.remove();
      res.send({ message: "Deleted User", user: deleteUser });
    }
  } catch (error) {
    res.status(500).send({ message: "couldn't Delete User" });
  }
});

router.put("/profile/update", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.newpassword) {
        user.password = bcrypt.hashSync(req.body.newpassword, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Couldn't Update Profile" });
  }
});

module.exports = router;
