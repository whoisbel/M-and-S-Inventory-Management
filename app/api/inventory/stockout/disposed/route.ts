import prisma from "@/utils/prisma";
import { StockOutType } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { gradeId, isWashed, quantity } = await request.json();
  const stock = await prisma.stock.findFirst({
    where: {
      gradeId: gradeId,
      isWashed: isWashed,
    },
    select: {
      id: true,
    },
  });

  await prisma.stock.update({
    where: {
      id: stock.id,
    },
    data: {
      quantityOnHand: {
        decrement: quantity,
      },
    },
  });
  await prisma.stockout.create({
    data: {
      quantity,
      stockId: stock.id,
      stockoutType: StockOutType.disposed,
    },
  });

  return NextResponse.json({ status: 200 });
}
