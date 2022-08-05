import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { ProductType } from "../../../types/productTypes";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "PATCH"],
    origin: (origin: any, callback: any) => {
      if (
        process.env.BASE_URL === `http://${req.headers.host}` ||
        process.env.BASE_URL === `https://${req.headers.host}`
      ) {
        callback(null, true);
      } else {
        res.status(401).json({ error: "You aren't authorized!" });
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === "GET") {
    const view = req.query.view as string | undefined;
    const category = req.query.category as string | undefined;
    const brand = req.query.brand as string | undefined;

    const skip = view ? parseInt(view) - 12 : 0;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            category: {
              contains: category ? category : undefined,
              mode: "insensitive",
            },
            brand: { contains: brand, mode: "insensitive" },
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
        instructions: true,
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
            id: true,
          },
          take: 3,
        },
      },
      take: 12,
      skip: skip,
    });

    const brands = await prisma.product.groupBy({
      by: ["brand"],
      _count: true,
    });

    const totalProducts = await prisma.product.count({
      where: {
        AND: [
          {
            category: {
              contains: category ? category : undefined,
              mode: "insensitive",
            },
            brand: { contains: brand, mode: "insensitive" },
          },
        ],
      },
    });

    res.status(200).json({
      products: products,
      totalProducts: totalProducts,
      brands: JSON.stringify(brands),
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
  }
}
