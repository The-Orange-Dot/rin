import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { reviews: true } },
        reviews: {
          orderBy: { helpful: "desc" },
          select: {
            userReview: { select: { username: true, image: true } },
            description: true,
            helpful: true,
            rating: true,
            createdAt: true,
            updatedAt: true,
          },
          take: 3,
        },
      },
    });

    res.status(200).json(products);
  } else if (req.method === "PATCH") {
    const { items } = req.body;

    console.log(items);

    const updatedItems = await Promise.all(
      items.map(async (item: any) => {
        const updatedItem = await prisma.product.update({
          where: { id: item.id },
          data: {
            quantity: { decrement: item.quantity },
          },
        });
        console.log(updatedItem.quantity);
        return updatedItem.name;
      })
    );

    res
      .status(200)
      .json({ res: "Items have been updated", items: updatedItems });
  }
}
