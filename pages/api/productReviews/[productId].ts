import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //Fetches product reviews
    const id = req.query.productId;
    const productReviews = await prisma.review.findMany({
      where: { productId: <any>{ equals: id } },
    });

    console.log(productReviews);

    res.status(200).json(productReviews);
  }
}
