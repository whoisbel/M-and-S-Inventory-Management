import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const areas = await prisma.area.findMany();
  return NextResponse.json(areas);
}

export async function POST(req: NextRequest) {
  const area = await req.json();
  console.log(area);
  await prisma.area.create({
    data: {
      description: area.description,
    },
  });
  return NextResponse.json({ status: 200 });
}

export async function PATCH(req: NextRequest) {
  const area = await req.json();
  await prisma.area.update({
    where: { id: area.id },
    data: {
      description: area.description,
    },
  });
  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  console.log(id);
  try {
    await prisma.area.delete({
      where: { id: id },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
