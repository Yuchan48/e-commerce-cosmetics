const bcrypt = require("bcrypt");

const userData = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: true,
  },
  {
    name: "Yuchan",
    email: "yuchan@gmail.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: false,
  },
  {
    name: "Iizuka",
    email: "iizuka@gmail.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: false,
  },
];

module.exports = userData;
