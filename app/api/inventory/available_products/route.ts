import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  const session = await getServerSession(options);
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

  return NextResponse.json({ availableProducts, area, grade });
}
