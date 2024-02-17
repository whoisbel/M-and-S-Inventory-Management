import { NextRequest, NextResponse } from "next/server";

import { sha256 } from "js-sha256";
import {
  User,
  SecurityQuestions,
  SecurityQuestionsAnswer,
} from "@prisma/client";
import prisma from "@/utils/prisma";
import { createAccountData } from "@/types";
import { signIn } from "next-auth/react";

export async function GET(request: NextRequest) {
  const userCount = await prisma.user.count();
  const securityQuestion = await prisma.securityQuestions.findMany();

  return NextResponse.json({
    isSetup: userCount == 0,
    securityQuestions: securityQuestion,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { user, securityQuestionAnswers } = await request.json();
    if (user.isSetup) {
      if (user.code != process.env.SETUP_ACCESS_CODE) {
        return NextResponse.json(
          { error: "Access Code Incorrect" },
          { status: 401 }
        );
      }
    }

    const userRequest: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: sha256(user.password1),
      userName: user.username,
      isAdmin: user.companyRole == "Admin",
      hasAccess: user.isSetup,
    };
    const userCreated = await prisma.user.create({
      data: userRequest,
    });

    await prisma.securityQuestionsAnswer.createMany({
      data: securityQuestionAnswers.map(
        (answer: { id: number; answer: string }) => {
          return {
            questionId: Number(answer.id),
            answer: sha256(answer.answer.toLowerCase()),
            userId: userCreated.id,
          };
        }
      ),
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
