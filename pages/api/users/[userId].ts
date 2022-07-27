import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27; orders_beta=v4",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = req.query.userId as string;

    const userData = await prisma.user.findFirst({ where: { id: userId } });
    console.log(userData);

    if (
      !userData?.address1 &&
      !userData?.city &&
      !userData?.state &&
      !userData?.zipcode
    ) {
      res.status(500).json({ message: "No address" });
    }

    res.status(200).json({ userData });
  } else if (req.method === "PATCH") {
    const userId = req.query.userId as string;
    const body = req.body;

    const userUpdated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        address1: body.address.line1,
        address2: body.address.line2,
        city: body.address.city,
        state: body.address.state,
        zipcode: body.address.postal_code,
        country: "US",
        homePhone: body.phone,
      },
    });

    await stripe.customers.update(userId, {
      address: body.address,
      shipping: {
        name: body.name,
        address: body.address,
      },
      phone: body.phone,
    });

    res.status(200).json({ message: "User info has been updated" });
  }
}
