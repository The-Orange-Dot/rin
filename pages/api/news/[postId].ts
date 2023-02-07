// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const postId = req.query.postId as string;

    const post = await prisma.post.findFirst({
      where: { id: parseInt(postId) },
    });

    res.status(200).json(post);
  } else if (req.method === "PATCH") {
    const postId = req.query.postId as string;
    const { body, title, subtitle, image } = req.body;

    let newPost = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: {
        body: body,
        subtitle: subtitle,
        title: title,
        image: image,
      },
    });

    //@ts-ignore
    newPost.createdAt = newPost.createdAt.toString();
    //@ts-ignore
    newPost.updatedAt = newPost.updatedAt.toString();

    res.status(200).json({ newPost });
  }
}
