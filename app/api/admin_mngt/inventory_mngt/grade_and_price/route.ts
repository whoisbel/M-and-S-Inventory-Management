import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const grades = await prisma.grade.findMany();
  return NextResponse.json(grades);
}

export async function POST(req: NextRequest) {
  const grade = await req.json();
  const doesExist = await prisma.grade.findFirst({
    where: {
      description: grade.description,
    },
  });
  if (doesExist) {
    return NextResponse.json({ error: "Grade already exist" }, { status: 500 });
  }
  await prisma.grade.create({
    data: grade,
  });
  return NextResponse.json({ message: "success" });
}

export async function PATCH(req: NextRequest) {
  const grade = await req.json();
  console.log({ grade });

  //if the new desription matches the existing descritpions of the different grade
  const doesExist = await prisma.grade.findFirst({
    where: {
      AND: [
        {
          id: {
            not: grade.id,
          },
          description: grade.description,
        },
      ],
    },
  });
  console.log({ doesExist });
  if (doesExist) {
    return NextResponse.json(
      { error: "Grade description already exist" },
      { status: 500 }
    );
  }

  await prisma.grade.update({
    where: {
      id: grade.id,
    },
    data: {
      description: grade.description,
      price: grade.price,
    },
  });
  return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  try {
    await prisma.grade.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: "Grade is deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Grade is in use" }, { status: 500 });
  }
}
