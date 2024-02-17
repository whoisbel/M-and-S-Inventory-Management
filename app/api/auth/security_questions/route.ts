import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: NextRequest) {
  const question = await prisma.securityQuestions.findMany();
  console.log(question);
  return NextResponse.json(question);
}

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();
    const users = await prisma.user.findFirst({
      where: {
        userName: username,
      },
      select: {
        id: true,
      },
    });
    if (users) {
      const securityQuestionAnswer =
        await prisma.securityQuestionsAnswer.findMany({
          where: {
            userId: users.id,
          },
          select: {
            questionId: true,
            answer: true,
          },
        });
      console.log(securityQuestionAnswer);
      return NextResponse.json(securityQuestionAnswer);
    } else {
      return NextResponse.json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
