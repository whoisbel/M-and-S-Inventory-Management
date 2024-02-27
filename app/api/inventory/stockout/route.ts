import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { Grade, Stock, StockOutType, Stockout } from "@prisma/client";
import { createStockout } from "@/utils/stockoutTransaction";

export async function GET(request: NextRequest) {
  const stocks = await prisma.stock.findMany({
    distinct: ["gradeId"],
    where: {
      quantityOnHand: {
        gt: 0,
      },
      grade: {
        description: {
          not: "Ungraded",
        },
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
export async function POST(request: NextRequest) {
  const stockouts = await request.json();
  console.log(stockouts);
  //update ungraded stock

  const transaction = await prisma.$transaction(async (tx) => {
    try {
      await Promise.all(
        stockouts.map((stockout: Stockout) => createStockout(tx, stockout))
      );
      return NextResponse.json({ status: 400 });
    } catch (error) {
      console.error("Error creating stockouts:", error);
      return NextResponse.json({ status: 500 });
    }
  });

  return NextResponse.json({ status: 200 });
}
