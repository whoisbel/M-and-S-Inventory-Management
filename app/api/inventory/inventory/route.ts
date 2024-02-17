import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { categoryFormData } from "@/types";

const prisma = new PrismaClient();

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

export async function POST(request: NextRequest) {
  const { categoryFormData, inventoryId } = await request.json();
  let totalAmount = 0; //this is the total amount to subtract from the ungraded inventory
  const sortedData: { [key: number]: { [key: string]: { quantity: number } } } =
    {}; //gamiton nato ang grade as ilhanan

  const data = await prisma.inventory.findUnique({
    where: {
      id: inventoryId,
    },
    select: {
      stockId: true,
      harvestLog: {
        select: {
          id: true,
          area: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
  const {
    harvestLog: {
      id: logId,
      area: { id: areaId },
    },
  } = data;

  categoryFormData.map((data: categoryFormData) => {
    if (
      sortedData[data.grade] &&
      sortedData[data.grade][String(data.isWashed)]
    ) {
      sortedData[data.grade][String(data.isWashed)].quantity += data.quantity;
    } else {
      sortedData[data.grade] = {
        ...sortedData[data.grade],
        [String(data.isWashed)]: {
          quantity: data.quantity,
        },
      };
    }
  });

  const insertData: Prisma.InventoryCreateManyInput[] = [];

  Object.keys(sortedData).map((gradeString) => {
    const gradeId = Number(gradeString);
    Object.keys(sortedData[gradeId]).map((isWashed) => {
      totalAmount += sortedData[gradeId][isWashed].quantity;
      insertData.push({
        stockId: 0,
        gradeId: gradeId,
        isWashed: isWashed == "true",
        quantity: sortedData[gradeId][isWashed].quantity,
        logId: logId,
      });
    });
  });
  await prisma.inventory.createMany({
    data: insertData,
  });

  //update the ungraded inventory
  await prisma.inventory.update({
    where: {
      id: inventoryId,
    },
    data: {
      quantity: {
        decrement: totalAmount,
      },
    },
  });

  await prisma.stock.update({
    where: {
      id: data.stockId,
    },
    data: {
      quantityOnHand: {
        decrement: totalAmount,
      },
    },
  });

  return NextResponse.json("good");
}

export async function DELETE(request: NextRequest) {
  const { inventoryId } = await request.json();

  console.log(inventoryId);

  try {
    const inventoryForDeletion = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
      include: {
        harvestLog: {
          select: {
            area: true,
          },
        },
      },
    });
    console.log(inventoryForDeletion);
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

    //The quantity that is being deleted is back to the ungraded quantity
    await prisma.inventory.update({
      where: {
        id: ungradedInventory.id,
      },
      data: {
        quantity: {
          increment: inventoryForDeletion.quantity,
        },
      },
    });
    await prisma.stock.update({
      where: {
        id: ungradedInventory.stockId,
      },
      data: {
        quantityOnHand: {
          increment: inventoryForDeletion.quantity,
        },
      },
    });
    // Remove the quantity from stock
    await prisma.stock.update({
      where: {
        id: inventoryForDeletion.stockId,
      },
      data: {
        quantityOnHand: {
          decrement: inventoryForDeletion.quantity,
        },
      },
    });
    await prisma.inventory.delete({
      where: {
        id: inventoryId,
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { inventoryId, newQuantity } = await request.json();
  try {
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
    const difference = inventory.quantity - newQuantity;

    //update inventory
    await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        quantity: newQuantity,
      },
    });
    await prisma.inventory.update({
      where: {
        id: ungradedInventory.id,
      },
      data: {
        quantity: {
          increment: difference,
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
          decrement: difference,
        },
      },
    });
    await prisma.stock.update({
      where: {
        id: ungradedInventory.stockId,
      },
      data: {
        quantityOnHand: {
          increment: difference,
        },
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
