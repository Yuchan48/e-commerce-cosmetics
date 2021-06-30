require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./backend/models/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//router
app.use("/api/products", require("./backend/routes/productsRoutes"));
app.use("/api/product", require("./backend/routes/ProductDetailsRoutes"));
app.use("/api/users", require("./backend/routes/userRoutes"));
app.use("/api/orders", require("./backend/routes/orderRoutes"));
app.use("/api/payment", require("./backend/routes/paymentRoutes"));
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sandbox");
});
app.use("/api/config/stripe", (req, res) => {
  res.send(process.env.STRIPE_TEST_API_KEY);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
