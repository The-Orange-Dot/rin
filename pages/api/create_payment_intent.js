// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { prisma } from "../../prisma/db";

export default async function handler(req, res) {
  const { items } = req.body;
  const { ids } = req.body;
  let array = [];

  const dbProducts = await prisma.product.findMany({
    where: {
      id: { in: ids },
    },
  });

  const priceArray = dbProducts.map((dbProduct) => {
    const cartItem = items.find((item) => {
      return item.id === dbProduct.id;
    });

    if (cartItem) {
      return dbProduct.price * cartItem.quantity;
    }
  });

  const total = priceArray.reduce((total, price) => {
    return (total += price);
  }, 0);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
