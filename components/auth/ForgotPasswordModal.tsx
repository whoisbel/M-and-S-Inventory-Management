"use client";
import { forgotPasswordData } from "@/types";
import { useState, useEffect } from "react";
import { SecurityQuestions, SecurityQuestionsAnswer } from "@prisma/client";
import Swal from "sweetalert2";
import { swalCustomClass } from "@/utils/swalConfig";
interface SecurityQuestion {
  id: number;
  question: string;
}

const ForgotPasswordModal = ({
  setShowForgotPasswordModal,
  forgotPasswordData,
  setShowForgotPasswordData,
}: {
  setShowForgotPasswordModal: (val: boolean) => void;
  forgotPasswordData: forgotPasswordData;
  setShowForgotPasswordData: (data: forgotPasswordData) => void;
}) => {
  const closeModal = () => setShowForgotPasswordModal(false);
  const [securityQuestionAnswers, setSecurityQuestionAnswers] = useState<
    SecurityQuestionsAnswer[]
  >([
    { id: 0, answer: "", question: { id: 0, question: "" } },
    { id: 0, answer: "", question: { id: 0, question: "" } },
    { id: 0, answer: "", question: { id: 0, question: "" } },
  ]);
  const [userId, setUserId] = useState<number>(0);
  const [questionsModal, setQuestionsModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  //useEffect(() => {
  //  //TANGAL LANG PAG NA IMPLEMENT NA TUNG PAG KUHA SA 3 KA QUESTION NA DAPAT SA USER JUD
  //  //TESTING PURPOSE RA NI DIRI
  //  const fetchQuestions = async () => {
  //    try {
  //      const response = await fetch("/api/auth/security_questions");
  //      if (!response.ok) {
  //        throw new Error("Failed to fetch security questions.");
  //      }
  //      const questions = await response.json();
  //      setSecurityQuestions(questions);
  //    } catch (error: any) {
  //      console.error(error);
  //    }
  //  };
  //  fetchQuestions();
  //}, []);

  const handleSelectChange = (event: any, index: any) => {
    const { value } = event.target;
    setSecurityQuestionAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index].id = parseInt(value);
      return updatedAnswers;
    });
  };

  const handleAnswerChange = (event: any, index: number) => {
    const { value } = event.target;
    setSecurityQuestionAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index].answer = value;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = async (index: number) => {
    const response = await fetch("api/auth/forgot_password/check_question", {
      method: "POST",
      body: JSON.stringify({
        securityQuestionsAnswerId: securityQuestionAnswers[index].id,
        answer: securityQuestionAnswers[index].answer,
      }),
    });
    if (!response.ok) {
      Swal.fire({
        title: "Error",
        text: "Answer is incorrect",
        icon: "error",
        customClass: swalCustomClass,
      });
      return;
    }

    if (currentQuestionIndex < securityQuestionAnswers.length - 1) {
      if (!securityQuestionAnswers[index].answer.trim()) {
        //if user has no answer
        Swal.fire({
          title: "Error",
          text: "Please enter an answer",
          icon: "error",
          customClass: swalCustomClass,
        });
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowChangePasswordModal(true);
    }
  };

  const handleBackQuestion = () => {
    if (showChangePasswordModal) {
      setShowChangePasswordModal(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setQuestionsModal(false);
    }
  };

  const handleClosePasswordModal = () => setShowChangePasswordModal(false);
  const recoverAccount = async () => {
    // DIRI IBUTANG ANG CALL API PARA MAKUHA TUNG SECURITY QUESTION SA USER.. mana
    if (!nameRegex.test(forgotPasswordData.firstName)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid first name",
        icon: "error",
        customClass: swalCustomClass,
      });
      return;
    }

    if (!nameRegex.test(forgotPasswordData.lastName)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid last name",
        icon: "error",
        customClass: swalCustomClass,
      });
      return;
    }

    if (!forgotPasswordData.username) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid username",
        icon: "error",
        customClass: swalCustomClass,
      });
      return;
    }
    console.log(forgotPasswordData);
    const response = await fetch("api/auth/forgot_password", {
      method: "POST",
      body: JSON.stringify({
        firstName: forgotPasswordData.firstName,
        lastName: forgotPasswordData.lastName,
        userName: forgotPasswordData.username,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setUserId(data.user.id);
      const newSQA = securityQuestionAnswers.map((answer, index) => {
        answer.id = data.securityQuestionsAnswers[index].id;
        answer.question = data.securityQuestionsAnswers[index].question;
        return answer;
      });
      setSecurityQuestionAnswers(newSQA);
      setQuestionsModal(true);
    }
  };
  const closeRecoryQuestions = () => setQuestionsModal(false);
  const handleSubmitPassword = async () => {
    // DIRI IBUTANG ANG CALL SA API PARA MACHANGE ANG PASSWORD SA USER
    if (forgotPasswordData.newPassword !== forgotPasswordData.confNewPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        customClass: swalCustomClass,
      });
      return;
    }
    const response = await fetch("api/auth/forgot_password", {
      method: "PATCH",
      body: JSON.stringify({
        userId: userId,
        newPassword: forgotPasswordData.newPassword,
      }),
    });
    if (response.ok) {
      Swal.fire({
        title: "Success",
        text: "Password has been changed",
        icon: "success",
        customClass: swalCustomClass,
      }).then(() => {
        location.reload();
      });
    }
  };

  return (
    <div className="w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">
      <div className="flex justify-between items-center bg-accent-gray w-[400px] py-2 px-3 rounded-t-lg">
        <div className="flex w-full justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg">
          <p className="text-[20px] font-bold text-letters-color">
            Forgot Password
          </p>
          <button onClick={closeModal}>X</button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-custom-white w-[400px] user-information-modal">
        <h1 className="text-[30px] text-letters-color font-bold my-4 self-start pl-9">
          User Information
        </h1>
        {["firstName", "lastName", "username"].map((inputName, index) => (
          <div
            key={index}
            className="relative bg-main-background rounded-[20px] w-3/4 h-[46px] mb-[21px] shadow-lg border-2 group"
          >
            <input
              type="text"
              className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                forgotPasswordData[inputName] ? "pt-4" : ""
              } group`}
              placeholder={
                inputName.charAt(0).toUpperCase() +
                inputName
                  .slice(1)
                  .replace(/([A-Z])/g, " $1")
                  .trim()
              }
              value={forgotPasswordData[inputName].toString()}
              onChange={(e) => {
                setShowForgotPasswordData({
                  ...forgotPasswordData,
                  [inputName]: e.target.value,
                });
              }}
            />
            <label
              className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                forgotPasswordData[inputName] ? "opacity-100" : "opacity-0"
              } transition-opacity bg-transparent group-active:inline-block`}
            >
              {inputName.charAt(0).toUpperCase() +
                inputName
                  .slice(1)
                  .replace(/([A-Z])/g, " $1")
                  .trim()}{" "}
            </label>
          </div>
        ))}
        <button
          onClick={recoverAccount}
          className="bg-primary-color text-custom-white rounded-[20px] w-3/4 h-[46px] mt-2 mb-4 self-center"
        >
          Recover Account
        </button>
        {questionsModal && (
          <div className="w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">
            <div className="flex justify-between items-center bg-accent-gray w-[435px] py-2 px-3 rounded-t-lg">
              <div className="flex w-full justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg">
                <p className="text-[20px] font-bold text-letters-color">
                  Recovery Questions
                </p>
                <button onClick={closeRecoryQuestions}>X</button>
              </div>
            </div>

            {securityQuestionAnswers.map((answer, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center bg-custom-white w-[435px] security-questions-modal"
              >
                {index === currentQuestionIndex && (
                  <div className="modal">
                    <div className="modal-content mt-4 p-4">
                      <p
                        className="text-[15px] cursor-pointer"
                        onClick={() => {
                          handleBackQuestion();
                        }}
                      >
                        Back
                      </p>

                      <select
                        value={securityQuestionAnswers[index].question.id}
                        onChange={(event) => handleSelectChange(event, index)}
                        className="w-full px-4 text-[20px] border-2 flex items-center text-add-minus bg-main-background rounded-[20px] shadow-lg h-[46px] mb-[18px]"
                      >
                        <option value={0} disabled hidden>
                          {`Question ${index + 1}`}
                        </option>
                        <option
                          value={securityQuestionAnswers[index].question.id}
                        >
                          {securityQuestionAnswers[index].question.question}
                        </option>
                      </select>

                      <input
                        type="text"
                        value={answer.answer}
                        className="w-full px-4 text-[20px] border-2 flex items-center text-letters-color bg-main-background rounded-[20px] shadow-lg h-[46px] mb-[18px]"
                        onChange={(event) => handleAnswerChange(event, index)}
                      />

                      <button
                        onClick={() => {
                          handleNextQuestion(currentQuestionIndex);
                        }}
                        className="w-full bg-primary-color rounded-[20px] h-[46px] text-main-background"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {currentQuestionIndex === securityQuestionAnswers.length - 1 &&
              showChangePasswordModal && (
                <div className="modal w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">
                  <div className="flex justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg w-[435px] change-password-modal">
                    <div className="flex w-full justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg">
                      <p className="text-[20px] font-bold text-letters-color">
                        Change Password
                      </p>
                      <button onClick={handleClosePasswordModal}>X</button>
                    </div>
                  </div>

                  <div className="w-[435px] bg-custom-white px-5 py-4">
                    <p
                      className="text-[15px] cursor-pointer"
                      onClick={() => {
                        handleBackQuestion();
                      }}
                    >
                      Back
                    </p>
                  </div>

                  <div className="modal-content flex flex-col justify-center items-center bg-custom-white w-[435px] p-4">
                    <div className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[21px] shadow-lg border-2 group">
                      <input
                        type="password"
                        className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                          forgotPasswordData.firstName ? "pt-4" : ""
                        } group`}
                        placeholder="New Password"
                        value={forgotPasswordData.newPassword}
                        onChange={(e) => {
                          setShowForgotPasswordData({
                            ...forgotPasswordData,
                            newPassword: e.target.value,
                          });
                        }}
                      />
                      <label
                        className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                          forgotPasswordData.newPassword
                            ? "opacity-100"
                            : "opacity-0"
                        } transition-opacity bg-transparent group-active:inline-block`}
                      >
                        New Password
                      </label>
                    </div>

                    <div className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[21px] shadow-lg border-2 group">
                      <input
                        type="password"
                        className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                          forgotPasswordData.confNewPassword ? "pt-4" : ""
                        } group`}
                        placeholder="Confirm New Password"
                        value={forgotPasswordData.confNewPassword}
                        onChange={(e) => {
                          setShowForgotPasswordData({
                            ...forgotPasswordData,
                            confNewPassword: e.target.value,
                          });
                        }}
                      />
                      <label
                        className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                          forgotPasswordData.confNewPassword
                            ? "opacity-100"
                            : "opacity-0"
                        } transition-opacity bg-transparent group-active:inline-block`}
                      >
                        Confirm New Password
                      </label>
                    </div>

                    <button
                      onClick={handleSubmitPassword}
                      className="w-full bg-primary-color rounded-[20px] h-[46px]  text-main-background"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
