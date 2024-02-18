import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { Grade, Stock } from "@prisma/client";

export async function GET(request: NextRequest) {
  const stocks = await prisma.stock.findMany({
    distinct: ["gradeId"],
    where: {
      quantityOnHand: {
        gt: 0,
      },
    },
    select: {
      grade: true,
    },
  });
  const grade = stocks.map((stock: Stock) => stock.grade);
  const stockout = await prisma.stockout.findMany({
    include: {
      stock: {
        select: {
          grade: true,
        },
      },
    },
  });
  return NextResponse.json({ grade, stockout });
}
