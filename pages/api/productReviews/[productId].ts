import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const id = req.query.productId;
    const numberOfReviews: number = req.body;

    const product = await prisma.product.findFirst({
      where: { id: id?.toString() },
      include: {
        reviews: {
          orderBy: { helpful: "desc" },
          skip: numberOfReviews,
          take: 5,
          select: {
            userReview: { select: { username: true, image: true } },
            description: true,
            helpful: true,
            rating: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (product) {
      res.status(200).json(product.reviews);
    } else {
      res.status(400).json("Error: Coultn't find product");
    }
  }
}
