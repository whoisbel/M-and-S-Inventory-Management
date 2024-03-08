import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: NextRequest) {
  const actionLogs = await prisma.actionLog.findMany({
    include: {
      user: true,
    },
  });
  return NextResponse.json({ actionLogs });
}
