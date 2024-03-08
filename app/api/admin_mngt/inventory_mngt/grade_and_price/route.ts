import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Venue, Event } from "@prisma/client";
export async function GET(req: NextRequest) {
  const grades = await prisma.grade.findMany();
  return NextResponse.json(grades);
}

export async function POST(req: NextRequest) {
  const grade = await req.json();
  const session = await getServerSession(options);
  const doesExist = await prisma.grade.findFirst({
    where: {
      description: grade.description,
    },
  });
  if (doesExist) {
    return NextResponse.json({ error: "Grade already exist" }, { status: 500 });
  }
  await prisma.$transaction([
    prisma.grade.create({
      data: grade,
    }),
    prisma.actionLog.create({
      data: {
        venue: Venue.gradeAndPriceList,
        event: Event.add,
        userId: session!.user.id!,
      },
    }),
  ]);
  return NextResponse.json({ message: "success" });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(options);
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
  await prisma.$transaction([
    prisma.grade.update({
      where: {
        id: grade.id,
      },
      data: {
        description: grade.description,
        price: grade.price,
      },
    }),
    prisma.actionLog.create({
      data: {
        venue: Venue.gradeAndPriceList,
        event: Event.update,
        userId: session!.user.id!,
      },
    }),
  ]);
  return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options);
  const id = await req.json();
  try {
    await prisma.$transaction([
      prisma.grade.delete({
        where: {
          id: id,
        },
      }),
      prisma.actionLog.create({
        data: {
          venue: Venue.gradeAndPriceList,
          event: Event.delete,
          userId: session!.user.id!,
        },
      }),
    ]);
    return NextResponse.json({ message: "Grade is deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Grade is in use" }, { status: 500 });
  }
}
