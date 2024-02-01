import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { HarvestLog } from "@prisma/client";
import {
  harvestLogsCategoryDict,
  harvestLogCategoryData,
  gradeCategoryDict,
} from "@/types";
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  //returns  id | quantity | areaId | areaName | quantityOnHand  | gradeId | gradeName
  const results = await prisma.$queryRaw`SELECT 
  h.id,h.quantity, DATE_FORMAT(h.harvestDate, '%m-%d-%Y') as harvestDate, h.areaId, a.description as areaName, s.quantityOnHand,
  s.gradeId , g.description as gradeName FROM harvestlog h
  LEFT JOIN stock s ON s.batchId = h.id
  LEFT JOIN area a ON a.id = h.areaId
  LEFT JOIN grade g ON g.id = s.gradeId
  WHERE h.quantity > (
      SELECT COALESCE(SUM(quantityOnHand), 0)
      FROM stock s
      WHERE s.batchId = h.id);`;

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
    await prisma.$queryRaw`SELECT DISTINCT(DATE_FORMAT(harvestDate, '%m-%d-%Y')) as harvestDate FROM HarvestLog;`;
  console.log(dates);
  console.log(JSON.stringify(harvestLogs[1]));

  return NextResponse.json({ harvestLogs, areas, dates });
}
export async function POST(request: NextRequest) {
  console.log(await request.json());
  return NextResponse.json("");
}
