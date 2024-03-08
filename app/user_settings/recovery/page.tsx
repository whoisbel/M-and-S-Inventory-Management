"use client";
import { useState, useEffect } from "react";
import { GreenButton, Textfield } from "@/components";
import { SecurityQuestions, SecurityQuestionsAnswer } from "@prisma/client";
import Swal from "sweetalert2";
import { swalCustomClass } from "@/utils/swalConfig";

const Recovery = () => {
  const [securityQuestions, setSecurityQuestions] = useState<
    SecurityQuestions[]
  >([]);
  const [securityQuestionsAnswers, setSecurityQuestionsAnswers] = useState<
    SecurityQuestionsAnswer[]
  >([]);

  //get security questions and security answers picked by the user form the registration
  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("/api/user_settings/recovery");
      const { securityQuestions, securityQuestionsAnswers } = await res.json();
      setSecurityQuestions(securityQuestions);
      setSecurityQuestionsAnswers(securityQuestionsAnswers);
      console.log(securityQuestionsAnswers);
    }
    fetchQuestions();
  }, []);

  function handleSelectChange(id: number, questionId: number) {
    //id is the securityQuestionAnswerId
    //change the questions in the answers
    const newSecQuesAnswers = securityQuestionsAnswers.map((q) => {
      if (q.id == id) {
        q.questionId = questionId;
      }
      return q;
    });
    setSecurityQuestionsAnswers(newSecQuesAnswers);
  }
  function handleAnswerChange(id: number, answer: string) {
    //id is the securityQuestionAnswerId
    const newSecQuesAnswers = securityQuestionsAnswers.map((q) => {
      if (q.id == id) {
        q.answer = answer;
      }
      return q;
    });
    setSecurityQuestionsAnswers(newSecQuesAnswers);
  }

  //handle user submission
  async function handleSubmit() {
    const res = await fetch("/api/user_settings/recovery/", {
      method: "PATCH",
      body: JSON.stringify(securityQuestionsAnswers),
    });
    //get the message response
    const { message } = await res.json();
    //handle success or error in submission
    if (res.ok) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: message,
        customClass: swalCustomClass,
      }).then(() => {
        location.reload();
      });
    } else {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: message,
        customClass: swalCustomClass,
      });
    }
  }
  return (
    <div className="relative ml-3 pt-4 px-4 w-full border border-add-minus rounded-lg">
      <div className=" flex flex-col border-b-4 border-primary-color">
        <span className="text-[20px]">Change Recovery Questions</span>
      </div>
      <div className="mx-6 my-4 flex flex-col space-y-4 text-[20px]">
        {securityQuestionsAnswers.map((securityQuestionsAnswer, index) => (
          //map through the securityQuestionsAnswers picked by the user
          <div key={index} className="flex flex-col space-y-2">
            <span>Question {index + 1}</span>
            <select
              value={securityQuestionsAnswer.questionId}
              onChange={(e) =>
                handleSelectChange(securityQuestionsAnswer.id, +e.target.value)
              }
              className="h-[40px] px-4 pt-2 text-[20px] bg-main-background border-2 border-accent-gray rounded-lg hover:border-add-minus w-[500px]"
            >
              {securityQuestions.map((question) => (
                <option value={question.id} key={question.id}>
                  {question.question}
                </option>
              ))}
            </select>
            <Textfield
              onChange={(e) => {
                handleAnswerChange(securityQuestionsAnswer.id, e.target.value);
              }}
            />
          </div>
        ))}
      </div>
      <div className=" absolute bottom-5 right-5">
        <GreenButton
          onClick={() => {
            handleSubmit();
          }}
        >
          Save Changes
        </GreenButton>
      </div>
    </div>
  );
};

export default Recovery;
