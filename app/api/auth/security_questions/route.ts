import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

async function GET(request: NextRequest) {
  const securityQuestions = await prisma.securityQuestions.findMany();
  return NextResponse.json(securityQuestions);
}
