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
  //let dashboardData: DashboardData;
  //
  //const grade = await prisma.$queryRaw`SELECT
  //SUM(quantity_on_hand) as quantity, g.description as name FROM stock
  //LEFT JOIN grade as g ON stock.grade_id = g.id GROUP BY grade_id`;
  //
  //const area = await prisma.$queryRaw`SELECT
  //SUM(quantity_on_hand) as quantity, a.description as name FROM stock
  //LEFT JOIN area as a ON stock.area_id = a.id GROUP BY area_id`;
  //
  //const currentYearHarvestData = await prisma.$queryRaw`SELECT
  //  MONTH(harvest_date) AS month,
  //  SUM( quantity) AS quantity
  //  FROM HarvestLog
  //  WHERE YEAR(harvest_date) = YEAR(CURDATE())
  //  ORDER BY MONTH(harvest_date);
  //  GROUP BY MONTH(harvest_date)
  //`;
  //const pastYearHarvestData = await prisma.$queryRaw`SELECT
  //YEAR(harvest_date) AS year,
  //SUM( quantity) AS quantity
  //FROM HarvestLog
  //WHERE YEAR(harvest_date) = YEAR(CURDATE())
  //GROUP BY YEAR(harvest_date)
  //ORDER BY YEAR(harvest_date);
  //;//

  //const data: DashboardData = {
  //  grade: grade as DashboardData["grade"],
  //  area: area as DashboardData["area"],
  //  currentYearHarvestData:
  //    currentYearHarvestData as DashboardData["currentYearHarvestData"],
  //  pastYearHarvestData:
  //    pastYearHarvestData as DashboardData["pastYearHarvestData"],
  //};

  return NextResponse.json("hello");
}
