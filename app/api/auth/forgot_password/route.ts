import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { SecurityQuestions, SecurityQuestionsAnswer } from "@prisma/client";
import { sha256 } from "js-sha256";

export async function POST(request: NextRequest) {
  const { firstName, lastName, userName } = await request.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
      },
      select: {
        id: true,
      },
    });

    const securityQuestionsAnswers =
      await prisma.securityQuestionsAnswer.findMany({
        where: {
          userId: user.id,
        },
        select: {
          userId: true,
          id: true,
          question: true,
        },
      });
    console.log(securityQuestionsAnswers);

    return NextResponse.json({
      user,
      securityQuestionsAnswers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "User not found" }, { status: 500 });
  }
  return NextResponse.json("ok");
}

export async function PATCH(request: NextRequest) {
  const { userId, newPassword } = await request.json();
  await prisma.user.update({
    where: {
      id: +userId,
    },
    data: {
      password: sha256(newPassword),
    },
  });
  return NextResponse.json("ok");
}
