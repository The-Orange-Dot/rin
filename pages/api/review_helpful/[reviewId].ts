import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { helpful } = req.body;
    const id = req.query.reviewId as string;

    const updateHelpful = helpful ? { increment: 1 } : { decrement: 1 };

    await prisma.review.update({
      where: { id: id },
      data: { helpful: updateHelpful },
    });

    res.status(200).json({ res: "Updated like" });
  }
}
