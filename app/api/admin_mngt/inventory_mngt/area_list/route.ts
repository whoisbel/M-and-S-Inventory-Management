import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Event, Venue } from "@prisma/client";

export async function GET(req: NextRequest) {
  const areas = await prisma.area.findMany();
  return NextResponse.json(areas);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  const area = await req.json();
  console.log(area);
  await prisma.$transaction([
    prisma.area.create({
      data: {
        description: area.description,
      },
    }),
    prisma.actionLog.create({
      data: {
        venue: Venue.areaList,
        event: Event.add,
        userId: session!.user.id!,
      },
    }),
  ]);
  return NextResponse.json({ status: 200 });
}

export async function PATCH(req: NextRequest) {
  const area = await req.json();
  const session = await getServerSession(options);
  await prisma.$transaction([
    prisma.area.update({
      where: { id: area.id },
      data: {
        description: area.description,
      },
    }),
    prisma.actionLog.create({
      data: {
        venue: Venue.areaList,
        event: Event.update,
        userId: session!.user.id!,
      },
    }),
  ]);

  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const session = await getServerSession(options);
  console.log(id);
  try {
    await prisma.$transaction([
      prisma.area.delete({
        where: { id: id },
      }),
      prisma.actionLog.create({
        data: {
          venue: Venue.areaList,
          event: Event.delete,
          userId: session!.user.id!,
        },
      }),
    ]);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
