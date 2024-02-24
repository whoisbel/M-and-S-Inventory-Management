import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { Grade, Stock, StockOutType } from "@prisma/client";

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
  const {
    inventoryId,
    quantity,
    date,
  }: { inventoryId: number; quantity: number; date: string } =
    await request.json();
  const inventory = await prisma.inventory.findUnique({
    where: {
      id: inventoryId,
    },
  });

  //update ungraded stock
  await prisma.stock.update({
    where: {
      id: inventory.stockId,
    },
    data: {
      quantityOnHand: {
        decrement: quantity,
      },
    },
  });
  //update inventory quantity
  await prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data: {
      quantity: {
        decrement: quantity,
      },
    },
  });
  //create stockout
  await prisma.stockout.create({
    data: {
      dateOut: new Date(date),
      quantity: quantity,
      stockId: inventory.stockId,
      stockoutType: StockOutType.disposed,
    },
  });

  return NextResponse.json("success");
}
