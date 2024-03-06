import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { SecurityQuestionsAnswer } from "@prisma/client";
import { sha256 } from "js-sha256";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);
  const securityQuestions = await prisma.securityQuestions.findMany();
  const securityQuestionsAnswers =
    await prisma.securityQuestionsAnswer.findMany({
      where: {
        userId: session?.user.id,
      },
    });
  return NextResponse.json({ securityQuestions, securityQuestionsAnswers });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(options);

  const securityQuestionsAnswers: SecurityQuestionsAnswer[] = await req.json();

  try {
    await prisma.$transaction([
      ...securityQuestionsAnswers.map((questionAnswers) => {
        if (questionAnswers.answer != "") {
          return prisma.securityQuestionsAnswer.update({
            where: {
              id: questionAnswers.id,
            },
            data: {
              questionId: questionAnswers.id,
              answer: sha256(questionAnswers.answer.toLowerCase()),
            },
          });
        }
      }),
    ]);
    return NextResponse.json({
      message: "Security questions updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error in updating security questions." },
      { status: 500 }
    );
  }
}
