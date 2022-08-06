import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            username: {
              equals: credentials?.username.toLowerCase(),
              mode: "insensitive",
            },
          },
          include: {
            buyHistory: {
              orderBy: { createdAt: "desc" },
              include: { review: true },
            },
          },
        });
        //==>put bcrypt comparison here!<==
        if (
          user &&
          credentials &&
          bcrypt.compareSync(credentials.password, user.password)
        ) {
          return user;
        }

        return null;
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }: any) {
      //PUT ANY INFO TO BE SENT TO THE FRONT HERE!!
      //MUST AT LEAST HAVE NAME EMAIL AND IMAGE

      session = {
        firstName: token.user.firstName,
        lastName: token.user.lastName,
        email: token.user.email,
        image: token.user.image,
        phone: token.user.homePhone,
        mobile: token.user.mobilePhone,
        username: token.user.username,
        id: token.user.id,
        address1: token.user.address1,
        address2: token.user.address2,
        zipcode: token.user.zipcode,
        city: token.user.city,
        state: token.user.state,
        country: token.user.country,
        createdAt: token.user.createdAt,
        buyHistory: token.user.buyHistory,
      };

      session.status = token.user.status;

      return session;
    },
  },
};

export default NextAuth(authOptions);
