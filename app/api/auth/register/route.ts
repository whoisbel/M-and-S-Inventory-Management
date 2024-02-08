import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sha256 } from "js-sha256";
import { User } from "@prisma/client";

import { createAccountData } from "@/types";
import { signIn } from "next-auth/react";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const userCount = await prisma.user.count();
  console.log(userCount);
  return NextResponse.json({ isSetup: userCount == 0 });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (data.isSetup) {
      if (data.code != process.env.SETUP_ACCESS_CODE) {
        return NextResponse.json(
          { error: "Access Code Incorrect" },
          { status: 401 }
        );
      }
    }
    const userRequest: User = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      password: sha256(data.password1),
      userName: data.username,
      isAdmin: data.companyRole == "Admin",
      hasAccess: data.isSetup === true,
    };
    const userCreated = await prisma.user.create({
      data: userRequest,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
