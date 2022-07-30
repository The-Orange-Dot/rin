import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27; orders_beta=v4",
});

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

    const firstTimeReview = await user.buyHistory.find((buy: any) => {
      return buy.reviewWritten === true;
    });

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

    if (createdReview) {
      const coupon = !firstTimeReview
        ? await stripe.promotionCodes.create({
            coupon: "cEAJYRIi",
            code: "FIRST10OFF",
            customer: user.id,
            active: true,
            max_redemptions: 1,
          })
        : await stripe.promotionCodes.create({
            coupon: "gMd2EUMQ",
            customer: user.id,
            active: true,
            max_redemptions: 1,
          });

      console.log(coupon);
    }

    // await prisma.review.delete({ where: { id: "cl67g4s6v1559uw9imnfpepyy" } });
    // await prisma.review.delete({ where: { id: "cl67gin1g1889uw9iqcs5stes" } });
    // await prisma.review.delete({ where: { id: "cl67gvoxn2134uw9i0mmoqo7u" } });

    res.status(200).json({ updatedHistory: updatedHistory });
  }
}
