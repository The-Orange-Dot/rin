// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("test");

  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: {
        title: true,
        image: true,
        subtitle: true,
        createdAt: true,
        writer: true,
        category: true,
        id: true,
        keywords: true,
      },
    });

    res.status(200).json(posts);
  }
}
