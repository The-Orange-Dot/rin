import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../prisma/db";
import { ProductType, OrderHistoryType } from "../../types/productTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { products } = req.body;
    const { user } = req.body;
    const registeredUser: boolean = req.body.registeredUser;
    const { registeredUserData } = req.body;

    const username = registeredUser ? registeredUserData.username : "guest";

    const data: OrderHistoryType = {
      username: username,
      products: products,
      registeredUser: registeredUser,
      name: user.name,
      address1: user.address.line1,
      address2: user.address.line2,
      city: user.address.city,
      state: user.address.state,
      zipcode: user.address.postal_code,
      country: user.address.country,
    };

    //@ts-ignore
    await prisma.orderHistory.create({ data: data });

    res.status(201).json({ created: "Order history created" });
  }
}
