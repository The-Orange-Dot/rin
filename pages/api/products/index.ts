import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { ProductType } from "../../../types/productTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const view = req.query.view as string | undefined;
    const categoryFilter = req.query.category as string | undefined;
    const brandfilter = req.query.brand as string | undefined;

    const skip = view ? parseInt(view) - 12 : 0;
    const take = view ? parseInt(view) : 12;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            category: { contains: categoryFilter, mode: "insensitive" },
            brand: { contains: brandfilter, mode: "insensitive" },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        size: true,
        details: true,
        quantity: true,
        price: true,
        thumbnail: true,
        images: true,
        category: true,
        brand: true,
        description: true,
        rating: true,
        ingredients: true,
        _count: { select: { reviews: true } },
        reviews: {
          orderBy: { helpful: "desc" },
          select: {
            userReview: { select: { username: true, image: true } },
            description: true,
            helpful: true,
            rating: true,
            createdAt: true,
          },
          take: 3,
        },
      },
      take: take,
      skip: skip,
    });

    const totalProducts = await prisma.product.count();

    res.status(200).json({
      products: products,
      totalProducts: totalProducts,
    });
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
  } else if (req.method === "POST") {
  }
}
