import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const customers = await prisma.user.findMany({
      where: { NOT: { status: "admin" } },
      orderBy: { lastName: "asc" },
      select: {
        address1: true,
        address2: true,
        city: true,
        country: true,
        createdAt: true,
        email: true,
        firstName: true,
        homePhone: true,
        id: true,
        lastName: true,
        mobilePhone: true,
        state: true,
        status: true,
        username: true,
        zipcode: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ customers });
  }
}
