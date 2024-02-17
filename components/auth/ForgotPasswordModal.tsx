"use client"
import {forgotPasswordData} from "@/types";
import {useState, useEffect} from "react";

interface SecurityQuestionAnswer {
    questionId : number;
    answer : string;
}


const ForgotPasswordModal = ({setShowForgotPasswordModal, forgotPasswordData, setShowForgotPasswordData} : {
    setShowForgotPasswordModal: (val : boolean) => void;
    forgotPasswordData: forgotPasswordData;
    setShowForgotPasswordData: (data : forgotPasswordData) => void;
}) => {
    const closeModal = () => {
        setShowForgotPasswordModal(false)
    }
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
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/api/auth/security_questions");
                if (!response.ok) {
                    throw new Error("Failed to fetch security questions.");
                }

                const questions = await response.json();
                setSecurityQuestions(questions);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);
    const recoverAccount = async() => {
        try {
            const response = await fetch("/api/auth/security_questions", {
                method: "POST",
                body: JSON.stringify({username: forgotPasswordData.username}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch security questions.");
            }

            const data : SecurityQuestionAnswer[] = await response.json();
            const updatedAnswers = data.map((question : SecurityQuestionAnswer) => ({id: question.questionId, answer: question.answer}));

            setSecurityQuestionAnswers(updatedAnswers);
        } catch (error) {
            console.error("Error recovering account:", error);
        }
    };

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
                    <button onClick={closeModal}>X</button>
                </div>
            </div>
            <div
                className="flex flex-col justify-center items-center bg-custom-white w-[400px]">
                <h1 className="text-[30px] text-letters-color font-bold my-4 self-start pl-9">User Information</h1>
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
            </div>
        </div>
    );
}

export default ForgotPasswordModal;