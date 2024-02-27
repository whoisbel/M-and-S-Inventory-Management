import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    where: {
      hasAccess: true,
    },
    select: {
      id: true,
      isAdmin: true,
      firstName: true,
      lastName: true,
      hasAccess: true,
    },
  });
  return NextResponse.json(users);
}
