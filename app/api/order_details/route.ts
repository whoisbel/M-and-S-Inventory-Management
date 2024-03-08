import { NextResponse, NextRequest } from "next/server";
import {
  PrismaClient,
  StatusEnum,
  StockOutType,
  Event,
  Venue,
} from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const data = await prisma.orderDetail.findMany({
    include: {
      order: {
        include: {
          customer: true,
        },
      },
      stock: {
        include: {
          grade: true,
        },
      },
    },
  });

  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const { id, status } = await request.json();
  const session = await getServerSession(options);

  // if status is fullfilled, create stockout and update stock quantity
  try {
    if (status == StatusEnum.fullfilled) {
      const orderDetail = await prisma.orderDetail.findUnique({
        where: {
          id: id,
        },
        include: {
          stock: true,
        },
      });
      await prisma.$transaction([
        prisma.stockout.create({
          data: {
            stockId: orderDetail.stockId,
            quantity: orderDetail.orderQuantity,
            stockoutType: StockOutType.sold,
          },
        }),
        prisma.stock.update({
          where: {
            id: orderDetail.stockId,
          },
          data: {
            quantityOnHand: {
              decrement: orderDetail.orderQuantity,
            },
          },
        }),
        prisma.actionLog.create({
          data: {
            event: Event.update,
            venue: Venue.orderDetails,
            userId: session!.user.id!,
          },
        }),
      ]);
    }

    const updatedOrderDetail = await prisma.orderDetail.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json(
      { message: "Stockout updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while updating stockout" },
      { status: 500 }
    );
  }
}
