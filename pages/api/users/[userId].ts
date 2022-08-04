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

    const userData = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        username: true,
        id: true,
        firstName: true,
        lastName: true,
        address1: true,
        address2: true,
        city: true,
        country: true,
        state: true,
        zipcode: true,
        email: true,
        homePhone: true,
        mobilePhone: true,
        image: true,
        //@ts-ignore
        buyHistory: {
          orderBy: { createdAt: "desc" },
          include: { review: true },
        },
      },
    });

    if (
      !userData?.address1 &&
      !userData?.city &&
      !userData?.state &&
      !userData?.zipcode &&
      !req.query.profile_fetch
    ) {
      res.status(500).json({ message: "No address" });
    }

    res.status(200).json({ userData });
  } else if (req.method === "PATCH") {
    const userId = req.query.userId as string;
    const body = req.body;

    const fullName = `${body.firstName} ${body.lastName}`;

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
        mobilePhone: body.mobilePhone ? body.mobilePhone : null,
      },
    });

    await stripe.customers.update(userId, {
      address: body.address,
      shipping: {
        name: fullName,
        address: body.address,
      },
      phone: body.phone,
    });

    res.status(200).json({ message: "User info has been updated" });
  }
}
