import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function PATCH(req: NextRequest) {
  const user = await req.json();
  if (user.userName == "" || user.firstName == "" || user.lastName == "") {
    return NextResponse.json(
      { message: "Please fill all the fields." },
      { status: 500 }
    );
  }

  try {
    const session = await getServerSession(options);
    if (session?.user.id != user.id) {
      throw Error("session doesn't match the user data");
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "User can't be updated" },
      { status: 500 }
    );
  }
}
