import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const view: string | undefined = req.query.view as string | undefined;

    const skip = view ? parseInt(view) - 12 : 0;
    const take = view ? parseInt(view) : 12;

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
      take: take,
      skip: skip,
    });

    const totalProducts = await prisma.product.count();

    res.status(200).json({ products: products, totalProducts: totalProducts });
  } else if (req.method === "PATCH") {
    const { items } = req.body;

    const updatedItems = await Promise.all(
      items.map(async (item: any) => {
        const updatedItem = await prisma.product.update({
          where: { id: item.id },
          data: {
            quantity: { decrement: item.quantity },
          },
        });
        console.log(
          `Updated ${updatedItem.name}'s quantity from ${
            updatedItem.quantity + 1
          } to ${updatedItem.quantity}`
        );
        return updatedItem.name;
      })
    );

    res
      .status(200)
      .json({ res: "Items have been updated", items: updatedItems });
  }
}
