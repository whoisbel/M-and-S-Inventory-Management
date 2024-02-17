import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(
  request: Request,
  { params }: { params: { inventoryId: number } }
) {
  const inventoryId = +params.inventoryId;

  const selectedInventory = await prisma.inventory.findUnique({
    where: {
      id: inventoryId,
    },
    select: {
      harvestLog: {
        select: {
          area: true,
        },
      },
    },
  });
  const ungradedInventory = await prisma.inventory.findFirst({
    where: {
      harvestLog: {
        area: {
          id: selectedInventory.harvestLog.area.id,
        },
      },
      grade: {
        description: "ungraded",
      },
    },
  });

  return NextResponse.json({ ungradedInventory });
}
