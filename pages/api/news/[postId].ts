// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log(req.query);
    const postId = req.query.postId as string;

    const post = await prisma.post.findFirst({
      where: { id: parseInt(postId) },
    });

    res.status(200).json(post);
  } else if (req.method === "PATCH") {
    const postId = req.query.postId as string;
    const { body } = req.body;

    console.log(body);

    const newPost = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: {
        body: body,
      },
    });

    res.status(200).json({ newPost });
  }
}
