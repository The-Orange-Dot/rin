import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  } else {
    try {
      let { name, type } = req.body;

      const fileParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        ContentType: type,
        ACL: "public-read",
        Key: name,
        Expires: 600,
      };

      const url = await s3.getSignedUrlPromise("putObject", fileParams);

      console.log(url);

      res.status(200).json({ url });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
}
