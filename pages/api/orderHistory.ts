import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto";
import { prisma } from "../../prisma/db";
import { ProductType, OrderHistoryType } from "../../types/productTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { products } = req.body;
    const { user } = req.body;
    const registeredUser: boolean = req.body.registeredUser;
    const { registeredUserData } = req.body;
    const username = registeredUser ? registeredUserData.username : "guest";
    // const data: OrderHistoryType = {
    //   username: username,
    //   products: products,
    //   registeredUser: registeredUser,
    //   name: user.name,
    //   address1: user.address.line1,
    //   address2: user.address.line2,
    //   city: user.address.city,
    //   state: user.address.state,
    //   zipcode: user.address.postal_code,
    //   country: user.address.country,
    // };
    // //@ts-ignore
    // await prisma.orderHistory.create({ data: data });

    if (username !== "guest") {
      Promise.all(
        products.map(async (product: any) => {
          try {
            const productHistory = await prisma.userOrderHistory.findMany({
              where: {
                AND: [
                  { userId: { contains: registeredUserData.id } },
                  //@ts-ignore
                  { productId: product.id },
                ],
              },
            });

            const boughtBefore = productHistory.find((product) => {
              //@ts-ignore
              return product.firstBuy;
            });

            const reviewDone = productHistory.find((product) => {
              //@ts-ignore
              return product.reviewWritten;
            });

            if (boughtBefore) {
              if (reviewDone) {
                const productData = {
                  userId: registeredUserData.id,
                  quantity: product.quantity,
                  price: product.price,
                  size: product.size,
                  productId: product.id,
                  image: product.image,
                  brand: product.brand,
                  reviewWritten: true,
                  name: product.name,
                };

                //@ts-ignore
                await prisma.userOrderHistory.create({ data: productData });
              } else {
                const productData = {
                  userId: registeredUserData.id,
                  quantity: product.quantity,
                  price: product.price,
                  size: product.size,
                  productId: product.id,
                  image: product.image,
                  brand: product.brand,
                  reviewWritten: false,
                  name: product.name,
                };

                //@ts-ignore
                await prisma.userOrderHistory.create({ data: productData });
              }
            } else {
              const productData = {
                userId: registeredUserData.id,
                quantity: product.quantity,
                price: product.price,
                size: product.size,
                productId: product.id,
                image: product.image,
                brand: product.brand,
                name: product.name,
                reviewWritten: false,
                firstBuy: true,
              };
              //@ts-ignore
              await prisma.userOrderHistory.create({ data: productData });
            }
          } catch {
            const productData = {
              userId: registeredUserData.id,
              quantity: product.quantity,
              price: product.price,
              size: product.size,
              productId: product.id,
              image: product.image,
              brand: product.brand,
              name: product.name,
              reviewWritten: false,
              firstBuy: true,
            };
            //@ts-ignore
            await prisma.userOrderHistory.create({ data: productData });
          }
        })
      );
    }

    res.status(201).json({ created: "Order history created" });
  }
}
