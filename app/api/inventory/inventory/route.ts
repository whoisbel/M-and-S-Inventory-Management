import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const data =
    await prisma.$queryRaw`SELECT i.id, is_washed as isWashed, i.quantity,
  DATE_FORMAT(h.harvest_date, '%m-%d-%Y') AS harvestDate,
    a.description AS areaName, g.description AS gradeName
    FROM inventory i
    INNER JOIN harvestlog h ON i.log_id = h.id
    INNER JOIN area a ON h.area_id = a.id
    INNER JOIN grade g ON i.grade_id = g.id;
`;

  const area = await prisma.area.findMany();
  const grade = await prisma.grade.findMany();
  const date =
    await prisma.$queryRaw`SELECT DISTINCT(DATE_FORMAT(h.harvest_date, '%m-%d-%Y'))  AS harvestDate
  FROM inventory
  INNER JOIN harvestlog h ON inventory.log_id = h.id;`;
  return NextResponse.json({ data, area, grade, date });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  return NextResponse.json("good");
}
