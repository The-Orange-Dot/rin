import {
  ProductionQuantityLimitsOutlined,
  UpdateDisabled,
} from "@mui/icons-material";
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { ProductType } from "../../../types/productTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const id = req.query.id as string;
    const { data } = req.body;

    const product = await prisma.product.update({
      where: { id: id },
      data: data,
    });

    res.status(200).json({
      message: `${product.name} => ${Object.keys(data)[0]} changes to ${
        Object.values(data)[0]
      }`,
    });
  }
}
