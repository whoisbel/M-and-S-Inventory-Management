import prisma from "@/utils/prisma";
import { StockOutType, Venue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
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
  await prisma.$transaction([
    await prisma.stock.update({
      where: {
        id: stock.id,
      },
      data: {
        quantityOnHand: {
          decrement: quantity,
        },
      },
    }),
    await prisma.stockout.create({
      data: {
        quantity,
        stockId: stock.id,
        stockoutType: StockOutType.disposed,
      },
    }),
    await prisma.actionLog.create({
      data: {
        venue: Venue.stockout,
        event: "add",
        userId: session!.user.id!,
      },
    }),
  ]);

  return NextResponse.json({ status: 200 });
}
