import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { categoryFormData } from "@/types";
import { Console } from "console";

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

  console.log(data);
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

  console.log(categoryFormData);
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
  console.log({ insertData });
  return NextResponse.json("good");
}

export async function DELETE(request: NextRequest) {
  const { inventoryId } = await request.json();
  await prisma.inventory.delete({
    where: {
      id: inventoryId,
    },
  });
  return NextResponse.json("good");
  return NextResponse.json({ status: 400 });
}
