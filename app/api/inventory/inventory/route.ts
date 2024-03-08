import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Event, Prisma, Venue } from "@prisma/client";
import { categoryFormData } from "@/types";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const data =
    await prisma.$queryRaw`SELECT i.id, is_washed as isWashed, i.quantity,
  DATE_FORMAT(h.harvest_date, '%m-%d-%Y') AS harvestDate,
    a.description AS areaName, g.description AS gradeName
    FROM inventory i
    INNER JOIN harvestlog h ON i.log_id = h.id
    INNER JOIN area a ON h.area_id = a.id
    INNER JOIN grade g ON i.grade_id = g.id 
    WHERE i.quantity > 0
    ORDER BY h.harvest_date DESC;`;

  const area = await prisma.area.findMany();
  const grade = await prisma.grade.findMany();
  const date =
    await prisma.$queryRaw`SELECT DISTINCT(DATE_FORMAT(h.harvest_date, '%m-%d-%Y'))  AS harvestDate
  FROM inventory
  INNER JOIN harvestlog h ON inventory.log_id = h.id;`;
  return NextResponse.json({ data, area, grade, date });
}

/**
 * Handles the POST request for inventory route.
 *
 * @param request - The NextRequest object containing the request data.
 * @returns A NextResponse object with a JSON response.
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  const { categoryFormData, inventoryId } = await request.json();

  //ang inventoryId kay ang ungraded inventory Id nga gina sort
  const ungradedInventory = await prisma.inventory.findUnique({
    where: {
      id: inventoryId,
    },
  });
  await prisma.$transaction(async (tx) => {
    const prisma: any = tx;
    for (const data of categoryFormData) {
      //kwaon ang stock nga i-update or i-create
      const stock = await prisma.stock.upsert({
        where: {
          gradeId: data.grade,
          isWashed: data.isWashed,
        },
        update: {
          quantityOnHand: {
            increment: data.quantity,
          },
        },
        create: {
          quantityOnHand: data.quantity,
          gradeId: data.grade,
          isWashed: data.isWashed,
        },
      });

      await prisma.inventory.create({
        data: {
          gradeId: data.grade,
          logId: ungradedInventory.logId,
          quantity: data.quantity,
          stockId: stock.id,
        },
      });
      //paghuman ug add mag minus na sa ungraded inventory ug stock
      await prisma.inventory.update({
        where: {
          id: ungradedInventory.id,
        },
        data: {
          quantity: {
            decrement: data.quantity,
          },
        },
      });
      await prisma.stock.update({
        where: {
          id: ungradedInventory.stockId,
        },
        data: {
          quantityOnHand: {
            decrement: data.quantity,
          },
        },
      });
    }
    await prisma.actionLog.create({
      data: {
        venue: Venue.inventory,
        event: Event.add,
        userId: session!.user.id!,
      },
    });
  });

  return NextResponse.json("good");
}

export async function DELETE(request: NextRequest) {
  const { inventoryId } = await request.json();
  const session = await getServerSession(options);

  try {
    const inventoryForDeletion = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
      include: {
        grade: true,
        harvestLog: {
          select: {
            area: true,
          },
        },
      },
    });
    console.log(inventoryForDeletion);
    //if the inventory is ungraded
    if (inventoryForDeletion.grade.description.toLowerCase() == "ungraded") {
      console.log(inventoryForDeletion.stockId);
      await prisma.$transaction(async (tx) => {
        const prisma: any = tx;
        await prisma.stock.update({
          data: {
            quantityOnHand: {
              decrement: inventoryForDeletion.quantity,
            },
          },
          where: {
            id: inventoryForDeletion.stockId,
          },
        });
        await prisma.inventory.delete({
          where: {
            id: inventoryForDeletion.id,
          },
        });
        //add action log
        await prisma.actionLog.create({
          data: {
            venue: Venue.inventory,
            event: Event.delete,
            userId: session!.user.id!,
          },
        });
      });
      return NextResponse.json({ message: "Inventory deleted successfuly" });
    }

    const ungradedInventory = await prisma.inventory.findFirst({
      where: {
        harvestLog: {
          area: {
            id: inventoryForDeletion.harvestLog.area.id,
          },
        },
        grade: {
          description: "ungraded",
        },
      },
      include: {
        harvestLog: {
          select: {
            area: true,
          },
        },
      },
    });

    await prisma.$transaction([
      //The quantity that is being deleted is back to the ungraded quantity
      prisma.inventory.update({
        where: {
          id: ungradedInventory.id,
        },
        data: {
          quantity: {
            increment: inventoryForDeletion.quantity,
          },
        },
      }),
      prisma.stock.update({
        where: {
          id: ungradedInventory.stockId,
        },
        data: {
          quantityOnHand: {
            increment: inventoryForDeletion.quantity,
          },
        },
      }),
      // Remove the quantity from stock
      prisma.stock.update({
        where: {
          id: inventoryForDeletion.stockId,
        },
        data: {
          quantityOnHand: {
            decrement: inventoryForDeletion.quantity,
          },
        },
      }),
      prisma.inventory.delete({
        where: {
          id: inventoryId,
        },
      }),
      //add action log
      prisma.actionLog.create({
        data: {
          venue: Venue.inventory,
          event: Event.delete,
          userId: session!.user.id!,
        },
      }),
    ]);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { inventoryId, newQuantity } = await request.json();
  const session = await getServerSession(options);
  try {
    await prisma.$transaction(async (tx) => {
      const prisma: any = tx;
      const inventory = await prisma.inventory.findUnique({
        where: {
          id: inventoryId,
        },
        include: {
          stock: true,
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
            id: inventory.harvestLog.id,
          },
          grade: {
            description: "ungraded",
          },
        },
      });
      const difference = +newQuantity - +inventory.quantity;
      console.log({
        invetoryQuantity: inventory.quantity,
        newQuantity: newQuantity,
      });
      //update inventory
      await prisma.inventory.update({
        where: {
          id: inventoryId,
        },
        data: {
          quantity: newQuantity,
        },
      });

      //update ungraded inventory
      await prisma.inventory.update({
        where: {
          id: ungradedInventory.id,
        },
        data: {
          quantity: {
            decrement: difference,
          },
        },
      });

      //update stock
      await prisma.stock.update({
        where: {
          id: inventory.stockId,
        },
        data: {
          quantityOnHand: {
            increment: difference,
          },
        },
      });
      await prisma.stock.update({
        where: {
          id: ungradedInventory.stockId,
        },
        data: {
          quantityOnHand: {
            decrement: difference,
          },
        },
      });
      //add action log
      await prisma.actionLog.create({
        data: {
          venue: Venue.inventory,
          event: Event.update,
          userId: session!.user.id!,
        },
      });
    });
    return NextResponse.json(
      { message: "Inventory updated successfuly" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
