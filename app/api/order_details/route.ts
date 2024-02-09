import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const data = await prisma.$queryRaw`SELECT
  customer.first_name AS customerName,
  grade.description AS gradeName,
  stock.grade_id,
  orderdetail.order_quantity,
  grade.price,
  orderdetail.order_quantity * grade.price AS total_price,
  orderdetail.status,
  orderdetail.loading_schedule,
  ord.order_date
FROM orderdetail
JOIN \`order\` AS ord ON orderdetail.order_id = ord.id
JOIN stock ON orderdetail.stock_id = stock.id
JOIN grade ON stock.grade_id = grade.id
JOIN customer ON ord.customer_id = customer.id;
`;
  console.log(data);
  return NextResponse.json({ status: 200 });
}
