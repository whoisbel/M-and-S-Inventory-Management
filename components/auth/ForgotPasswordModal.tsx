"use client";
import {forgotPasswordData} from "@/types";
import {useState, useEffect} from "react";
interface SecurityQuestion {
    id : number;
    question : string;
}

const ForgotPasswordModal = ({setShowForgotPasswordModal, forgotPasswordData, setShowForgotPasswordData} : {
    setShowForgotPasswordModal: (val : boolean) => void;
    forgotPasswordData: forgotPasswordData;
    setShowForgotPasswordData: (data : forgotPasswordData) => void;
}) => {
    const closeModal = () => {
        setShowForgotPasswordModal(false);
    };
    const [securityQuestionAnswers,
        setSecurityQuestionAnswers] = useState([
        {
            id: 0,
            answer: ""
        }, {
            id: 0,
            answer: ""
        }, {
            id: 0,
            answer: ""
        }
    ]);
    const [questionsModal,
        setQuestionsModal] = useState(false);
    const [showPasswordModal,
        setShowingPasswordModal] = useState(false)
    const [securityQuestions,
        setSecurityQuestions] = useState < SecurityQuestion[] > ([]);
    const [currentQuestionIndex,
        setCurrentQuestionIndex] = useState(0);
    useEffect(() => {
        const fetchQuestions = async() => {
            try {
                const response = await fetch("/api/auth/security_questions");
                if (!response.ok) {
                    throw new Error("Failed to fetch security questions.");
                }

                const questions = await response.json();
                setSecurityQuestions(questions);
            } catch (error : any) {
                console.error(error);
            }
        };

        fetchQuestions();
    }, []);
    const handleSelectChange = (event : any, index : any) => {
        const {value} = event.target;
        setSecurityQuestionAnswers((prevState) => {
            const updatedAnswers = [...prevState];
            updatedAnswers[index].id = parseInt(value);
            return updatedAnswers;
        });
    };
    const handleAnswerChange = (event : any, index : any) => {
        const {value} = event.target;
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
            setShowingPasswordModal(true);
        }
    };

    const handleClosePasswordModal = () => {
        setShowingPasswordModal(false);
    };
    const recoverAccount = () => {
        setQuestionsModal(true);
    };
    const closeRecoryQuestions = () => {
        setQuestionsModal(false);
    };
    const handleSubmitPassword = () => {}
    return (
        <div
            className="w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">
            <div
                className="flex justify-between items-center bg-accent-gray w-[400px] py-2 px-3 rounded-t-lg">
                <div
                    className="flex w-full justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg">
                    <p className="text-[20px] font-bold text-letters-color">
                        Forgot Password
                    </p>
                    <button onClick={handleClosePasswordModal}>X</button>
                </div>
            </div>
            <div
                className="flex flex-col justify-center items-center bg-custom-white w-[400px]">
                <h1 className="text-[30px] text-letters-color font-bold my-4 self-start pl-9">
                    User Information
                </h1>
                <div
                    className="relative bg-main-background rounded-[20px] w-3/4 h-[46px] mb-[21px] shadow-lg border-2 group">
                    <input
                        type="text"
                        className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${forgotPasswordData.firstName
                        ? "pt-4"
                        : ""} group`}
                        placeholder="First name"
                        value={forgotPasswordData.firstName}
                        onChange={(e) => {
                        setShowForgotPasswordData({
                            ...forgotPasswordData,
                            firstName: e.target.value
                        });
                    }}/>
                    <label
                        className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${forgotPasswordData.firstName
                        ? "opacity-100"
                        : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                        First name
                    </label>
                </div>
                <div
                    className="relative bg-main-background rounded-[20px] w-3/4 h-[46px] mb-[21px] shadow-lg border-2 group">
                    <input
                        type="text"
                        className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${forgotPasswordData.lastName
                        ? "pt-4"
                        : ""} group`}
                        placeholder="Last name"
                        value={forgotPasswordData.lastName}
                        onChange={(e) => {
                        setShowForgotPasswordData({
                            ...forgotPasswordData,
                            lastName: e.target.value
                        });
                    }}/>
                    <label
                        className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${forgotPasswordData.lastName
                        ? "opacity-100"
                        : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                        Last name
                    </label>
                </div>
                <div
                    className="relative bg-main-background rounded-[20px] w-3/4 h-[46px] mb-[21px] shadow-lg border-2 group">
                    <input
                        type="text"
                        className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${forgotPasswordData.username
                        ? "pt-4"
                        : ""} group`}
                        placeholder="Username"
                        value={forgotPasswordData.username}
                        onChange={(e) => {
                        setShowForgotPasswordData({
                            ...forgotPasswordData,
                            username: e.target.value
                        });
                    }}/>
                    <label
                        className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${forgotPasswordData.username
                        ? "opacity-100"
                        : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                        username
                    </label>
                </div>
                <button
                    onClick={recoverAccount}
                    className="bg-primary-color text-custom-white rounded-[20px] w-3/4 h-[46px] mt-2 mb-4 self-center">
                    Recover Account
                </button>
                {questionsModal && (
                    <div
                        className="w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">
                        <div
                            className="flex justify-between items-center bg-accent-gray w-[435px] py-2 px-3 rounded-t-lg">
                            <div
                                className="flex w-full justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg">
                                <p className="text-[20px] font-bold text-letters-color">
                                    Recovery Questions
                                </p>
                                <button onClick={closeRecoryQuestions}>X</button>
                            </div>
                        </div>
                        {securityQuestionAnswers.map((answer, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center bg-custom-white w-[435px]">
                                {index === currentQuestionIndex && (
                                    <div className="modal ">
                                        <div className="modal-content mt-4 p-4">
                                            <select
                                                value={answer.id}
                                                onChange={(event) => handleSelectChange(event, index)}
                                                className="w-full px-4 text-[20px] border-2 flex items-center text-add-minus bg-main-background rounded-[20px] shadow-lg h-[46px] mb-[18px]">
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
                                                onChange={(event) => handleAnswerChange(event, index)}/>
                                            <button
                                                onClick={handleNextQuestion}
                                                className="w-full bg-primary-color rounded-[20px] h-[46px] text-main-background">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Add new modal for entering password and confirming */}
                        {currentQuestionIndex === securityQuestionAnswers.length - 1 && showPasswordModal && (
                            <div
                                className="modal w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">
                                <div
                                    className="flex justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg w-[435px]">
                                    <div
                                        className="flex w-full justify-between items-center bg-accent-gray py-2 px-3 rounded-t-lg">
                                        <p className="text-[20px] font-bold text-letters-color">
                                            Change Password
                                        </p>
                                        <button onClick={closeModal}>X</button>
                                    </div>
                                </div>
                                <div
                                    className="modal-content flex flex-col justify-center items-center bg-custom-white w-[435px] p-4">
                                    <div
                                        className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[21px] shadow-lg border-2 group">
                                        <input
                                            type="password"
                                            className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${forgotPasswordData.firstName
                                            ? "pt-4"
                                            : ""} group`}
                                            placeholder="New Password"
                                            value={forgotPasswordData.newPassword}
                                            onChange={(e) => {
                                            setShowForgotPasswordData({
                                                ...forgotPasswordData,
                                                newPassword: e.target.value
                                            });
                                        }}/>
                                        <label
                                            className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${forgotPasswordData.newPassword
                                            ? "opacity-100"
                                            : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                            New Password
                                        </label>
                                    </div>
                                    <div
                                        className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[21px] shadow-lg border-2 group">
                                        <input
                                            type="password"
                                            className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${forgotPasswordData.confNewPassword
                                            ? "pt-4"
                                            : ""} group`}
                                            placeholder="Confirm New Passowrd"
                                            value={forgotPasswordData.confNewPassword}
                                            onChange={(e) => {
                                            setShowForgotPasswordData({
                                                ...forgotPasswordData,
                                                confNewPassword: e.target.value
                                            });
                                        }}/>
                                        <label
                                            className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${forgotPasswordData.confNewPassword
                                            ? "opacity-100"
                                            : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                            Confirm New Password
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleSubmitPassword}
                                        className=" w-full bg-primary-color rounded-[20px] h-[46px]  text-main-background">
                                        Submit
                                    </button>
                                    {JSON.stringify(forgotPasswordData)}
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
