// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { PostType } from "../../../types/newsTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = req.query.filter as string;
    const category: string | undefined = query ? query : "";

    const posts = await prisma.post.findMany({
      where: { category: { equals: category } },
      orderBy: { id: "desc" },
      select: {
        title: true,
        image: true,
        subtitle: true,
        createdAt: true,
        body: true,
        writer: true,
        category: true,
        id: true,
        keywords: true,
      },
    });

    const updatedPosts = posts.map((post: any) => {
      let updatedPost = { ...post, createdAt: post.createdAt.toString() };
      return updatedPost;
    });

    res.status(200).json(updatedPosts);
  } else if (req.method === "POST") {
    const { title, subtitle, body, image, writer, category } = req.body;

    try {
      const createdPost = await prisma.post.create({
        data: {
          title: title,
          subtitle: subtitle,
          body: body,
          image: image,
          category: category,
          writer: writer,
        },
      });

      res.status(201).json({
        message: "Post has been created successfully",
        post: createdPost,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
}
