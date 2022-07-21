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
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            username: {
              equals: credentials.username.toLowerCase(),
              mode: "insensitive",
            },
          },
        });
        if (user.password === credentials.password) {
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
    async session({ session, token }) {
      //PUT ANY INFO TO BE SENT TO THE FRONT HERE!!
      //MUST AT LEAST HAVE NAME EMAIL AND IMAGE

      session.user = {
        name: token.user.firstName,
        email: token.user.email,
        image: token.user.image,
        username: token.user.username,
        id: token.user.id,
      };

      return session;
    },
  },
});
