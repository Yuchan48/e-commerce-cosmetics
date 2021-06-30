require("dotenv").config();
let jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY || "secretkey",
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_KEY || "secretkey", (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Admin Token" });
  }
};

const payOrderEmailTemplate = (order) => {
  return `
  <h1>Your order confirmation</h1>
  <h3>Order ID: ${order._id}</h3>
  <p style="font-size:13px;">Order Date: ${order.createdAt
    .toString()
    .substring(0, 10)}</p>
  <p style="font-size:13px;">${
    order.isPaid ? "Order has been paid" : "Order hasn't been paid"
  }</p>
  <table style="border-collapse: collapse;" cellpadding="10px 0">
  <thead>
  <tr  style=" border-bottom: 2px solid #555; font-size: 16px;">
  <td><strong>Product</strong></td>
  <td align="center"><strong>Quantity</strong></td>
  <td align="center"><strong>Price</strong></td>
  </tr>
  </thead>
  <tbody style="font-size: 15px;">
  ${order.orderItems
    .map(
      (item) => `
  <tr  style=" border-bottom: 1px solid #555;">
  <td>${item.name}</td>
  <td align="center">${item.qty}</td>
  <td align="center">${item.price.toFixed(2)}$</td>
  </tr>
  `
    )
    .join("\n")}
  </tbody>
  <tfoot style="font-size: 15px;">
  <tr>
  <td colspan="2"> &nbsp; Items Price: </td>
  <td align="center">${order.itemsPrice.toFixed(2)}$</td>
  </tr>
  <tr>
  <td colspan="2">  &nbsp; Shipping Price: </td>
  <td align="center"><strong>${order.shippingPrice.toFixed(2)}$</strong></td>
  </tr>
  <tr>
  <td colspan="2"> &nbsp; Total Price: </td>
  <td align="center">${order.totalPrice.toFixed(2)} $</td>
  </tr>
  <tr style="border-top: 2px solid #555;">
  <td colspan="2">  &nbsp; Payment Method: </td>
  <td align="center">${order.paymentMethod}</td>
  </tr>
  </tfoot>
  </table>
  <hr>
  <div style="margin-top: 30px; font-size: 16px;">
  <h2>Shipping Address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postcode}<br/>
  </p>
  </hr>
  <p>Thank you for shopping with us.</p>
  </div>
  `;
};

module.exports = { generateToken, isAuth, isAdmin, payOrderEmailTemplate };
