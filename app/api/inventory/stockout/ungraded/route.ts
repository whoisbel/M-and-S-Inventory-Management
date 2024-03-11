import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { StockOutType, Venue, Event } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  const { inventoryId, quantity, date } = await req.json();
  const session = await getServerSession(options);
  try {
    await prisma?.$transaction(async (tx) => {
      const prisma: any = tx;
      const inventory = await prisma.inventory.findUnique({
        where: {
          id: inventoryId,
        },
      });
      // subtract the stockout quantity to the ungraded inventory
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
      // subtract the stockout quantity to the ungraded stock
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

      // create the stockout
      await prisma.stockout.create({
        data: {
          stockId: inventory.stockId,
          quantity: quantity,
          stockoutType: StockOutType.disposed,
        },
      });
      await prisma.actionLog.create({
        data: {
          venue: Venue.stockout,
          event: Event.add,
          userId: session!.user.id!,
        },
      });
    });
    return NextResponse.json(
      { message: "Stock out created successfuly" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error in creating stockout" },
      { status: 500 }
    );
  }
}
