import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { changePasswordType } from "@/types";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { sha256 } from "js-sha256";
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(options);
  const passwordData: changePasswordType = await req.json();
  try {
    //check if on of the fields is blank return error if true
    let isDataBlank = false;
    Object.keys(passwordData).map((key) => {
      if (passwordData[key] == "") {
        isDataBlank = true;
      }
    });
    if (isDataBlank)
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 500 }
      );

    //check if new passwords matches
    if (passwordData.newPassword != passwordData.confNewPassword) {
      return NextResponse.json(
        { message: "New passwords doesn't match" },
        { status: 500 }
      );
    }

    //check if new password matches the old password
    const { password } = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        password: true,
      },
    });

    if (password != sha256(passwordData.oldPassword))
      return NextResponse.json(
        {
          message: "Wrong password",
        },
        { status: 500 }
      );

    //Update the password
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        password: sha256(passwordData.newPassword),
      },
    });
    return NextResponse.json({ message: "Password updated successfuly" });
  } catch (error) {
    return NextResponse.json(
      { message: "Password can't be updated" },
      { status: 500 }
    );
  }
  return NextResponse.json({ session });
}
