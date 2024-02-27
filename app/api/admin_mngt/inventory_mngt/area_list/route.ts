import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const areas = await prisma.area.findMany();
  return NextResponse.json(areas);
}
