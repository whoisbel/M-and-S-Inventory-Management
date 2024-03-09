import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Venue, Event } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Console } from "console";
export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    where: {
      hasAccess: false,
    },
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      hasAccess: true,
    },
  });
  return NextResponse.json(users);
}
export async function PATCH(req: NextRequest) {
  const { user } = await req.json();
  console.log(user);

  const session = await getServerSession(options);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: +user.id },
      data: {
        hasAccess: true,
      },
    }),

    prisma.actionLog.create({
      data: {
        venue: Venue.requestForApproval,
        event: Event.update,
        userId: session!.user.id!,
      },
    }),
  ]);
  return NextResponse.json({ message: "Request approved" }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { user } = await req.json();
  const session = await getServerSession(options);
  await prisma.$transaction([
    prisma.user.delete({
      where: { id: user.id },
    }),
    prisma.actionLog.create({
      data: {
        venue: Venue.requestForApproval,
        event: Event.delete,
        userId: session!.user.id!,
      },
    }),
  ]);
  return NextResponse.json({ message: "Request denied" }, { status: 200 });
}
