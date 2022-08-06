import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { prisma } from "../../../prisma/db";
import { Prisma } from "@prisma/client";
import { ValidateEmail } from "../../../components/EmailValidator";
import { json } from "stream/consumers";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27; orders_beta=v4",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { userData } = req.body;
    const { passwordConfirm } = req.body;
    const saltRounds = 10;
    const plainTextPassword = userData.password;
    const validEmail = ValidateEmail(userData.email);

    if (userData.password !== passwordConfirm) {
      console.log("Passwords don't match");
      res.status(400).json({
        message: "Password and Password confirm does not match",
        type: "password",
      });
    } else if (!validEmail) {
      console.log("Email not valid");
      res.status(400).json({ message: "Email is not valid", type: "email" });
    } else {
      try {
        bcrypt.genSalt(saltRounds, (error, salt) => {
          bcrypt.hash(plainTextPassword, salt, async (error, hash) => {
            userData.password = hash;
            const userDetails = await prisma.user.create({ data: userData });

            const username = `${userDetails.firstName
              .slice(0, 1)
              .toUpperCase()}${userDetails.firstName.slice(
              1
            )} ${userDetails.lastName
              .slice(0, 1)
              .toUpperCase()}${userDetails.lastName.slice(1)}`;

            const loginDetails = {
              username: userData.username,
              password: userData.password,
            };

            const stripeCustomerObj = {
              id: userDetails.id,
              balance: 0,
              name: username,
              email: userDetails.email,
              description: `Rin Username: ${userDetails.username}`,
            };

            const stripeRes = await stripe.customers.create(stripeCustomerObj);

            res.status(201).json({
              loginDetails: loginDetails,
              res: "User created successfully",
            });
          });
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            res.status(406).json({ message: error.meta?.target });
          }
        }
      }
    }
  }
}
