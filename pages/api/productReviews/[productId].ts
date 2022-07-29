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
            id: true,
          },
        },
      },
    });

    if (product) {
      res.status(200).json(product.reviews);
    } else {
      res.status(400).json("Error: Coultn't find product");
    }
  } else if (req.method === "POST") {
    const productId = req.query.productId as string;
    const { product } = req.body;
    const { review } = req.body;
    const { user } = req.body;

    const reviewData = {
      userId: user.id,
      productId: productId,
      rating: review.rating,
      description: review.review,
      orderId: product.id,
    };

    const createdReview = await prisma.review.create({ data: reviewData });

    const updatedHistory = await prisma.userOrderHistory.update({
      where: { id: product.id },
      data: { reviewWritten: true },
      include: { review: true },
    });

    await prisma.userOrderHistory.updateMany({
      //@ts-ignore
      where: { AND: [{ productId: productId }, { userId: user.id }] },
      data: { reviewWritten: true },
    });

    // await prisma.review.delete({ where: { id: "cl64vzak900685b9id2ahxs6q" } });

    res.status(200).json({ updatedHistory: updatedHistory });
  }
}
