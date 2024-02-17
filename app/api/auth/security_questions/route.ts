import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";

async function GET(request: NextRequest) {
  const securityQuestions = await prisma.securityQuestions.findMany();
  return NextResponse.json(securityQuestions);
}
