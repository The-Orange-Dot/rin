import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userData } = req.body;
    const { passwordConfirm } = req.body;

    if (userData.password !== passwordConfirm) {
      console.log("Passwords dont match");
      res
        .status(500)
        .json({ error: "Password and Password confirm does not match" });
    } else {
      try {
        await prisma.user.create({ data: userData });

        const loginDetails = {
          username: userData.username,
          password: userData.password,
        };

        res.status(201).json({
          loginDetails: loginDetails,
          res: "User created successfully",
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            res.status(406).json({ error: error.meta?.target });
          }
        }
      }
    }
  }
}
