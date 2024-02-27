import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    where: {
      hasAccess: false,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      hasAccess: true,
    },
  });
  return NextResponse.json(users);
}
