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
  let dashboardData: DashboardData;

  const grade = await prisma.$queryRaw`SELECT
  SUM(quantityOnHand) as quantity, g.description as name FROM stock 
  LEFT JOIN grade as g ON stock.gradeId = g.id GROUP BY gradeId`;

  const area = await prisma.$queryRaw`SELECT 
  SUM(quantityOnHand) as quantity, a.description as name FROM stock
  LEFT JOIN area as a ON stock.areaId = a.id GROUP BY areaId`;

  const currentYearHarvestData = await prisma.$queryRaw`SELECT
    MONTH(harvestDate) AS month,
    SUM( quantity) AS quantity
    FROM HarvestLog
    WHERE YEAR(harvestDate) = YEAR(CURDATE())
    GROUP BY MONTH(harvestDate)
    ORDER BY MONTH(harvestDate);
  `;
  const pastYearHarvestData = await prisma.$queryRaw`SELECT
  YEAR(harvestDate) AS year,
  SUM( quantity) AS quantity
  FROM HarvestLog
  WHERE YEAR(harvestDate) = YEAR(CURDATE())
  GROUP BY YEAR(harvestDate)
  ORDER BY YEAR(harvestDate);
`;

  const data: DashboardData = {
    grade: grade as DashboardData["grade"],
    area: area as DashboardData["area"],
    currentYearHarvestData:
      currentYearHarvestData as DashboardData["currentYearHarvestData"],
    pastYearHarvestData:
      pastYearHarvestData as DashboardData["pastYearHarvestData"],
  };
  const p = prisma.personnel.findMany();
  return NextResponse.json(p);
}
