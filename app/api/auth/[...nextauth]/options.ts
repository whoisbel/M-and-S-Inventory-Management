import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
const prisma = new PrismaClient();
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.personnel.findUnique({
          where: {
            id: credentials?.id,
            password: credentials?.password,
          },
        });
        console.log(user);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },
  callbacks: {
    async session({ session }) {
      //get the user in database and add id in the new session.

      return session;
    },
  },
};
