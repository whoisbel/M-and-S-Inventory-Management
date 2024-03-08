import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Event, HarvestLog, Venue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import {
  harvestLogsCategoryDict,
  harvestLogCategoryData,
  gradeCategoryDict,
} from "@/types";

export async function GET(request: NextRequest) {
  //returns  id | quantity | areaId | areaName | quantityOnHand  | gradeId | gradeName
  const results = await prisma.$queryRaw`SELECT 
  h.id,h.quantity, DATE_FORMAT(h.harvest_date, '%m-%d-%Y') as harvestDate, h.area_id, a.description as areaName
  FROM harvestlog h LEFT JOIN area a ON a.id = h.area_id;`;

  const harvestLogs: harvestLogsCategoryDict = {};

  for (const result of results) {
    const grade: gradeCategoryDict = {};
    //add grade to its rightful key ang if else kay either i add sya sa existing na harvestLog or mag himo ug bag.o kung walay ga exist

    if (harvestLogs[result.id] != null) {
      console.log(result.id);
      //if harvestLog is already in dictionary
      const harvestLog = harvestLogs[result.id];
      harvestLog.grade[result.gradeId] = {
        gradeId: result.gradeId,
        gradeName: result.gradeName,
        quantityOnHand: result.quantityOnHand,
      };
      harvestLogs[result.id] = harvestLog;
    } else {
      //declare ang grade
      grade[result.gradeId] = {
        gradeId: result.gradeId,
        gradeName: result.gradeName,
        quantityOnHand: result.quantityOnHand,
      };
      const harvestLog: harvestLogCategoryData = {
        id: result.id,
        harvestDate: result.harvestDate,
        areaName: result.areaName,
        areaId: result.areaId,
        quantity: result.quantity,
        grade: grade,
      };
      harvestLogs[result.id] = harvestLog;
    }
  }

  const areas = await prisma.area.findMany();
  const dates =
    await prisma.$queryRaw`SELECT DISTINCT(DATE_FORMAT(harvest_date, '%m-%d-%Y')) as harvestDate FROM HarvestLog;`;
  console.log(dates);
  console.log(JSON.stringify(harvestLogs[1]));

  return NextResponse.json({ harvestLogs, areas, dates });
}
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(options);
  const formData = await request.formData();
  const area = formData.get("area");
  console.log(formData);
  try {
    await prisma.harvestLog.update({
      where: {
        id: Number(formData.get("harvestLogId")),
      },
      data: {
        area: {
          connect: await prisma.area.findFirst({
            where: {
              description: String(formData.get("area")),
            },
          }),
        },
        harvestDate: new Date(String(formData.get("harvestDate"))),
      },
    });
    await prisma.actionLog.create({
      data: {
        venue: Venue.inventoryInput,
        event: Event.update,
        userId: session!.user.id!,
      },
    });
    return NextResponse.json("success");
  } catch (error) {
    return NextResponse.json("error");
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(options);
  const response = await request.json();
  try {
    prisma.$transaction([
      await prisma.harvestLog.delete({
        where: {
          id: response.id,
        },
      }),
      await prisma.actionLog.create({
        data: {
          venue: Venue.inventoryInput,
          event: Event.delete,
          userId: session!.user.id!,
        },
      }),
    ]);
    return NextResponse.json("success");
  } catch (error) {
    return NextResponse.json("error");
  }
}
