import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
});

const s3 = new AWS.S3();
const BUCKET = process.env.S3_UPLOAD_BUCKET;

const params = {
  Bucket: BUCKET as string,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    s3.listObjects(params, async (error: any, data: any) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: error });
      }

      const allData = await data.Contents.map((image: any) => {
        if (!image.Key.includes(".DS_Store")) {
          return {
            image: `https://${BUCKET}.s3.amazonaws.com/${image.Key}`,
            name: image.Key,
          };
        }
      });

      const images = allData.filter((img: string) => img);

      res.status(200).json({ images });
    });
  }
}
