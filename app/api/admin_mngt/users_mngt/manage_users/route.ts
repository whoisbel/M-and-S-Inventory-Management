import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Event, Venue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    where: {
      hasAccess: true,
    },
    select: {
      id: true,
      isAdmin: true,
      firstName: true,
      lastName: true,
      hasAccess: true,
    },
  });
  return NextResponse.json(users);
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
        venue: Venue.manageUsers,
        event: Event.delete,
        userId: session!.user.id!,
      },
    }),
  ]);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
