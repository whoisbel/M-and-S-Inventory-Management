import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { StockOutType } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { gradeId: number; isWashed: string } }
) {
  const { gradeId, isWashed } = params;
  console.log(gradeId, isWashed);
  const stock = await prisma.stock.findFirst({
    where: {
      gradeId: +gradeId,
      isWashed: isWashed === "true",
    },
  });

  console.log({ gradeId, isWashed, stock }, Boolean(isWashed));

  return NextResponse.json(stock);
}
