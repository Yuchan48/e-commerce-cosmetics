require("dotenv").config();
let express = require("express");
let router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
const { v4: uuid } = require("uuid");

router.post("/", async (req, res) => {
  try {
    const { order, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuid();

    const charge = await stripe.charges.create(
      {
        amount: order.totalPrice * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Your order id : ${order._id}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      { idempotencyKey }
    );

    res.send({
      status: "success",
      chargeId: charge.id,
      update_time: charge.created,
    });
  } catch (error) {
    console.log("stripe payment failed");
    res.status(500).send({ message: "payment failed" });
  }
});

module.exports = router;
