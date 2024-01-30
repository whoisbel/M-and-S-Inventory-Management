import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth from "next-auth/next";
import { options } from "./options";
const prisma = new PrismaClient();
const handler = NextAuth(options);

export { handler as GET, handler as POST };
