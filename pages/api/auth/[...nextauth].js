import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const staff = await prisma.staff.findFirst({
          where: { username: credentials.username },
        });
        if (staff.password === credentials.password) {
          return staff;
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
    async session({ session, token }) {
      //PUT ANY INFO TO BE SENT TO THE FRONT HERE!!
      session.user = {
        name: `${token.user.firstName} ${token.user.lastName}`,
        username: user.username,
      };
      return session;
    },
  },
});
