import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const availableProducts = await prisma.stock.findMany({
    include: {
      grade: {
        select: {
          description: true,
          price: true,
        },
      },
    },
  });

  const area = await prisma.area.findMany();
  const grade = await prisma.grade.findMany();

  console.log({ availableProducts });
  return NextResponse.json({ availableProducts, area, grade });
}
