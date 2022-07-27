// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27; orders_beta=v4",
});
import { prisma } from "../../prisma/db";
import requestIp from "request-ip";

export default async function handler(req, res) {
  const detectedIp = requestIp.getClientIp(req);
  const { items } = req.body;
  const { ids } = req.body;
  const { shipping } = req.body;
  const { customerId } = req.body;

  let userData = {};

  console.log(customerId);

  const dbProducts = await prisma.product.findMany({
    where: {
      id: { in: ids },
    },
  });

  if (!items || !ids || ids.length !== dbProducts.length) {
    res.status(400).send({ error: "Invalid items" });
  }

  const lineItemObject = await Promise.all(
    items.map(async (product) => {
      const dbProduct = await prisma.product.findFirst({
        where: { id: product.id },
      });

      try {
        await stripe.products.retrieve(dbProduct.id);

        const lineItem = {
          quantity: product.quantity,
          discounts: null,
          product: dbProduct.id,
        };

        return lineItem;
      } catch (error) {
        const isActive = dbProduct.quantity > 1;

        await stripe.products.create({
          id: dbProduct.id,
          name: dbProduct.name,
          active: isActive,
          description: `${dbProduct.size} ${
            dbProduct.details ? ` - ${dbProduct.details}` : ""
          }`,
          default_price_data: {
            currency: "usd",
            unit_amount: dbProduct.price * 100,
            tax_behavior: "exclusive",
          },
          images: [dbProduct.thumbnail],
        });

        const lineItem = {
          quantity: product.quantity,
          discounts: null,
          product: dbProduct.id,
        };

        return lineItem;
      }
    })
  );

  if (customerId) {
    //If the user is a CUSTOMER, this data will pass to stripe
    const user = await prisma.user.findFirst({
      where: { id: { equals: customerId } },
    });

    const fullName = `${user.firstName
      .slice(0, 1)
      .toUpperCase()}${user.firstName.slice(1)} ${user.lastName
      .slice(0, 1)
      .toUpperCase()}${user.lastName.slice(1)}`;

    userData = {
      currency: "usd",
      ip_address: detectedIp,
      line_items: lineItemObject,
      customer: customerId,
      shipping_details: {
        name: fullName,
        address: {
          line1: user.address1,
          line2: user.address2,
          city: user.city,
          state: user.state,
          postal_code: user.zipcode,
          country: user.country,
        },
      },
      discounts: null, //Change this for coupons in the future
    };
  } else {
    //If the user is a GUEST, this data will pass to stripe
    userData = {
      currency: "usd",
      ip_address: detectedIp,
      line_items: lineItemObject,
      shipping_details: {
        name: shipping.name,
        address: {
          line1: shipping.address.line1,
          line2: shipping.address.line2,
          city: shipping.address.city,
          state: shipping.address.state,
          postal_code: shipping.address.postal_code,
          country: shipping.address.country,
        },
      },
      discounts: null, //Change this for coupons in the future
    };
  }

  const order = await stripe.orders.create(userData);

  console.log("ORDER DETAIL: ", order);

  res.status(200).json({
    clientSecret: order.client_secret,
    shipping: order.shipping_details,
    total: order.amount_total,
  });
}
