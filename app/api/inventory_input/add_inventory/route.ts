import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Event, HarvestLog, Prisma, Venue } from "@prisma/client";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const area = await prisma.area.findMany();

  return NextResponse.json(area);
}

export async function POST(request: NextRequest) {
  const { date, addFormData } = await request.json();

  const harvestLogs: HarvestLog[] = [];
  const session = await getServerSession(options);
  for (const requestData of addFormData) {
    const harvestLog: HarvestLog = {
      areaId: Number(requestData.area),
      quantity: Number(requestData.quantity),
      harvestDate: new Date(date),
    };
    harvestLogs.push(harvestLog);
  }

  await prisma.$transaction(async (tx) => {
    const prisma: any = tx;
    const ungradedGrade = await prisma.grade.findFirst({
      where: {
        description: "Ungraded",
      },
      select: {
        id: true,
      },
    });
    const ungradedStock = await prisma.stock.findFirst({
      where: {
        AND: {
          gradeId: ungradedGrade.id,
          isWashed: false,
        },
      },
    });

    for (const harvestLog of harvestLogs) {
      //create the harvest log
      const newHarvestLog = await prisma.harvestLog.create({
        data: harvestLog,
      });

      //update or create the stock if update increment the quantity on hand
      const ungradeStock = await prisma.stock.upsert({
        where: {
          gradeId_isWashed: {
            gradeId: ungradedGrade.id,
            isWashed: false,
          },
        },
        update: {
          quantityOnHand: {
            increment: harvestLog.quantity,
          },
        },
        create: {
          quantityOnHand: harvestLog.quantity,
          gradeId: ungradedGrade.id,
          isWashed: false,
        },
      });

      //create the inventory
      await prisma.inventory.create({
        data: {
          quantity: harvestLog.quantity,
          stockId: ungradeStock.id,
          logId: newHarvestLog.id,
          gradeId: ungradedGrade.id,
        },
      });
    }
    await prisma.actionLog.create({
      data: {
        venue: Venue.inventoryInput,
        event: Event.add,
        userId: session!.user.id!,
      },
    });
  });

  return NextResponse.json("");
}
