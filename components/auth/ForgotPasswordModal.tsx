"use client";
import { forgotPasswordData } from "@/types";
import { useState, useEffect } from "react";

interface SecurityQuestion {
    id: number;
    question: string;
}

const ForgotPasswordModal = ({
    setShowForgotPasswordModal,
    forgotPasswordData,
    setShowForgotPasswordData
}: {
    setShowForgotPasswordModal: (val: boolean) => void;
    forgotPasswordData: forgotPasswordData;
    setShowForgotPasswordData: (data: forgotPasswordData) => void;
}) => {
    const closeModal = () => setShowForgotPasswordModal(false);
    const [securityQuestionAnswers, setSecurityQuestionAnswers] = useState([
        { id: 0, answer: "" },
        { id: 0, answer: "" },
        { id: 0, answer: "" }
    ]);
    const [questionsModal, setQuestionsModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        //MADE ONLY FOR TESTING NI PARA SAMPLE FOR SECURITY QUESTIONS. ILISI LANG PARA MAKUHA JUD TUNG 3 KA TAMA NGA SECURITY QUESTION SA USER
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/api/auth/security_questions");
                if (!response.ok) {
                    throw new Error("Failed to fetch security questions.");
                }
                const questions = await response.json();
                setSecurityQuestions(questions);
            } catch (error: any) {
                console.error(error);
            }
        };
        fetchQuestions();
    }, []);

    const handleSelectChange = (event: any, index: any) => {
        const { value } = event.target;
        setSecurityQuestionAnswers((prevState) => {
            const updatedAnswers = [...prevState];
            updatedAnswers[index].id = parseInt(value);
            return updatedAnswers;
        });
    };

    const handleAnswerChange = (event: any, index: any) => {
        const { value } = event.target;
        setSecurityQuestionAnswers((prevState) => {
            const updatedAnswers = [...prevState];
            updatedAnswers[index].answer = value;
            return updatedAnswers;
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < securityQuestionAnswers.length - 1) {
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
    const recoverAccount = () => {
        // DIRI IBUTANG ANG POST CALL API PARA MAKUHA TUNG SECURITY QUESTION SA USER
        setQuestionsModal(true)
    };
    const closeRecoryQuestions = () => setQuestionsModal(false);
    const handleSubmitPassword = () => { 
        // DIRI IBUTANG ANG CALL SA API PARA MACHANGE ANG PASSWORD SA USER
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

            <div className="flex flex-col justify-center items-center bg-custom-white w-[400px]">
                <h1 className="text-[30px] text-letters-color font-bold my-4 self-start pl-9">
                    User Information
                </h1>

                {['firstName', 'lastName', 'username'].map((inputName, index) => (
                    <div key={index} className="relative bg-main-background rounded-[20px] w-3/4 h-[46px] mb-[21px] shadow-lg border-2 group">
                        <input
                            type="text"
                            className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                                forgotPasswordData[inputName] ? "pt-4" : ""
                            } group`}
                            placeholder={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                            value={forgotPasswordData[inputName].toString()}
                            onChange={(e) => {
                                setShowForgotPasswordData({
                                    ...forgotPasswordData,
                                    [inputName]: e.target.value
                                });
                            }}
                        />
                        <label
                            className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                                forgotPasswordData[inputName] ? "opacity-100" : "opacity-0"
                            } transition-opacity bg-transparent group-active:inline-block`}
                        >
                            {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
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
                            <div key={index} className="flex flex-col justify-center items-center bg-custom-white w-[435px]">
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
                                                value={answer.id}
                                                onChange={(event) => handleSelectChange(event, index)}
                                                className="w-full px-4 text-[20px] border-2 flex items-center text-add-minus bg-main-background rounded-[20px] shadow-lg h-[46px] mb-[18px]"
                                            >
                                                <option value={0} disabled hidden>
                                                    {`Question ${index + 1}`}
                                                </option>
                                                {securityQuestions.map((question) => (
                                                    <option key={question.id} value={question.id}>
                                                        {question.question}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="text"
                                                value={answer.answer}
                                                className="w-full px-4 text-[20px] border-2 flex items-center text-letters-color bg-main-background rounded-[20px] shadow-lg h-[46px] mb-[18px]"
                                                onChange={(event) => handleAnswerChange(event, index)}
                                            />

                                            <button
                                                onClick={handleNextQuestion}
                                                className="w-full bg-primary-color rounded-[20px] h-[46px] text-main-background"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {currentQuestionIndex === securityQuestionAnswers.length - 1 && showChangePasswordModal && (
                            <div className="modal w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">
                                <div className="flex justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg w-[435px]">
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
                                                    newPassword: e.target.value
                                                });
                                            }}
                                        />
                                        <label
                                            className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                                                forgotPasswordData.newPassword ? "opacity-100" : "opacity-0"
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
                                                    confNewPassword: e.target.value
                                                });
                                            }}
                                        />
                                        <label
                                            className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                                                forgotPasswordData.confNewPassword ? "opacity-100" : "opacity-0"
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
