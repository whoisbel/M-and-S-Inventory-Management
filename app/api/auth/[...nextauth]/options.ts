import type { NextAuthOptions, User } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { sha256 } from "js-sha256";
import { User as UserType } from "@prisma/client";
const prisma = new PrismaClient();
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user: UserType = await prisma.user.findFirst({
            where: {
              userName: credentials?.username,
              password: sha256(credentials!.password),
            },
          });

          if (user && user.hasAccess) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },

  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      return token;
    },
    async session({ session, token }) {
      //get the user in database and add id in the new session.

      try {
        session.user = await prisma.user.findUnique({
          where: {
            id: Number(token.sub),
          },
        });
      } catch (error) {
        console.log(error);
      }

      return session;
    },
  },
};
