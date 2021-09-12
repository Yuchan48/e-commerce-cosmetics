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
    const {email, password} = req.body.userData;
    const user = await User.findOne({ email: email });
    if (bcrypt.compareSync(password, user.password)) {
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
  const {name, email, password} = req.body.userData;
  try {
    const user = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: user._id,
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
    console.log('user:', user)
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "user not found" });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const {name, email,isAdmin} = req.body.userData;
  try {
    const user = await User.findById(req.params.id);
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = Boolean(isAdmin);
    const updatedUser = user.save();
    console.log('updatedUser:', updatedUser)
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
    console.log("req.body: ", req.body)
    const { name, email, password, newpassword } = req.body;
    if (bcrypt.compareSync(password, user.password)) {
      user.name = name || user.name;
      user.email = email || user.email;

      if (newpassword) {
        user.password = bcrypt.hashSync(newpassword, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: user._id,
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
