import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { sha256 } from "js-sha256";

export async function POST(request: NextRequest) {
  const { securityQuestionsAnswerId, answer } = await request.json();
  const securityQuestionsAnswer =
    await prisma.securityQuestionsAnswer.findUnique({
      where: {
        id: securityQuestionsAnswerId,
      },
    });
  const cryptedAnswer = sha256(answer.toLowerCase());
  if (securityQuestionsAnswer.answer === cryptedAnswer) {
    return NextResponse.json("ok");
  } else {
    return NextResponse.json({ error: "Answer is incorrect" }, { status: 500 });
  }
}
