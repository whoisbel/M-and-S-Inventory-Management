import { NextRequest, NextResponse } from "next/server";

import { DashboardData } from "@/types";

import prisma from "@/utils/prisma";

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
    SELECT SUM(quantity_on_hand) AS quantity,
          grade.description AS name
    FROM stock
    INNER JOIN grade ON grade.id = stock.grade_id
    GROUP BY grade_id;
  `;

  const monthSummary = await prisma.$queryRaw`
  SELECT SUM(quantity) AS quantity, MONTH(harvest_date) AS month  FROM HarvestLog
  WHERE YEAR(harvest_date) = YEAR(CURDATE()) 
  GROUP BY MONTH(harvest_date);
  `;

  const yearSummary = await prisma.$queryRaw`
  SELECT SUM(quantity) AS quantity, YEAR(harvest_date) AS year  FROM HarvestLog
  GROUP BY YEAR(harvest_date);
  `;

  console.log({ yearSummary });
  return NextResponse.json({
    gradeSummary,

    monthSummary,
    yearSummary,
  });
}
