import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
export async function GET() {
  const session = await getServerSession(options);
  const actionLogs = await prisma.actionLog.findMany({
    include: {
      user: true,
    },
  });
  console.log({ actionLogs });
  return NextResponse.json({ actionLogs });
}
