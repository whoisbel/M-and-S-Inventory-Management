import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { HarvestLog } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const area = await prisma.area.findMany();

  return NextResponse.json(area);
}

export async function POST(request: NextRequest) {
  const { date, addFormData } = await request.json();

  const harvestLogs: HarvestLog[] = [];

  for (const requestData of addFormData) {
    const harvestLog: HarvestLog = {
      areaId: Number(requestData.area),
      quantity: Number(requestData.quantity),
      harvestDate: new Date(date),
    };
    harvestLogs.push(harvestLog);
  }

  await prisma.harvestLog.createMany({
    data: harvestLogs,
  });
  return NextResponse.json("");
}