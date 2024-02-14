import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DashboardData } from "@/types";
const prisma = new PrismaClient();

/* 
  Get the required dashboard data
  data returned: DashboardData
  {
    grade: [
      grade1: kg
      grade2: kg
    ]
    area: [
      area1: kg
      area2: kg
    ]
    currentYearHarvestData: [
      month1: kg
      month2: kg

    ]
    pastYearHarvestData: [
      year1: kg
      year2: kg

    ]
  }
*/
export async function GET(request: NextRequest) {
  const gradeSummary = await prisma.$queryRaw`
    SELECT SUM(quantity_on_hand) AS totalQuantity,
          grade.description AS name
    FROM stock
    INNER JOIN grade ON grade.id = stock.grade_id
    GROUP BY grade_id;
  `;

  const areaSummary = await prisma.$queryRaw`
    SELECT SUM(quantity_on_hand) AS totalQuantity,
          area.description AS name
    FROM stock
    INNER JOIN area ON area.id = stock.area_id
    GROUP BY area_id;
  `;

  console.log();
  return NextResponse.json({ gradeSummary, areaSummary });
}
