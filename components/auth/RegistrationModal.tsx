"use client";
import {createAccountData} from "@/types";
import {swalCustomClass} from "@/utils/swalConfig";
import {signIn} from "next-auth/react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
const RegistrationModal = ({
    setShowModal,
    accountData,
    setAccountData,
    isSetup = false
} : {
    setShowModal: (value : boolean) => void;
    accountData: createAccountData;
    setAccountData: (data : createAccountData) => void;
    isSetup?: boolean;
}) => {
    useEffect(() => {
        setAccountData({
            ...accountData,
            companyRole: "Admin",
            isSetup: isSetup
        });
    }, []);
    const options = [
        {
            label: "Admin",
            value: "Admin"
        }, {
            label: "Employee",
            value: "Employee"
        }
    ];

    const clearAccountData = () => {
        // Clear the input fields when closing the modal
        const data = accountData;
        Object
            .keys(data)
            .map((key) => {
                data[key] = "";
            });
        setAccountData(data);
    };
    const closeModal = () => {
        setShowModal(false);
        clearAccountData();
    };

    const handleSubmit = async() => {
        //password1 and password2 checking,
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(accountData)
        });
        if (isSetup) {
            if (response.ok) {
                Swal.fire({title: "User Registered", icon: "success", customClass: swalCustomClass});
                signIn("credentials", {
                    username: accountData.username,
                    password: accountData.password1,
                    callbackUrl: "/"
                });
            } else {
                const {error} = await response.json();
                Swal.fire({title: "Error", text: error, icon: "error", customClass: swalCustomClass});
            }
        } else {
            if (response.ok) {
                Swal
                    .fire({title: "User Account Requested", icon: "success", text: "Please wait for approval", customClass: swalCustomClass})
                    .then(() => {
                        closeModal();
                    });
            } else {
                const {error} = await response.json();
                Swal.fire({title: "Error", text: error, icon: "error", customClass: swalCustomClass});
            }
        }
    };

    const initialSecurityQuestions = ["What is your mother's maiden name?", "What is the name of your first pet?", "In what city were you born?", "What is your favorite movie?", "What is the name of your favorite teacher?"];
    const [selectedOptions,
        setSelectedOptions] = useState(['', '', '']);

    const handleSelectChange = (event : any, index : any) => {
        const selectedQuestion = event.target.value;
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[index] = selectedQuestion;
        setSelectedOptions(updatedSelectedOptions);
    };
    return (
        <div
            className="w-full h-full flex justify-center items-center fixed bg-main-background/90">
            <div className="w-[650px] rounded-lg bg-custom-white">
                <div
                    className="flex w-full justify-between items-center bg-accent-gray py-3 px-4 rounded-t-lg">
                    <p className="text-[20px] font-bold text-letters-color">
                        {isSetup
                            ? "Setup Account"
                            : "Create Account"}
                    </p>
                    <button onClick={closeModal}>X</button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-max h-max flex flex-col justify-center">
                        <h1 className="text-[40px] font-bold text-letters-color self-center">
                            M&S Company
                        </h1>
                        <h1 className="text-[20px] font-bold text-letters-color mb-1">
                            User Information
                        </h1>
                        <div className="flex w-full">
                            <div
                                className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[18px] shadow-lg border-2 group">
                                <input
                                    type="text"
                                    className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${accountData.firstName
                                    ? "pt-4"
                                    : ""} group`}
                                    placeholder="First name"
                                    value={accountData.firstName}
                                    onChange={(e) => {
                                    setAccountData({
                                        ...accountData,
                                        firstName: e.target.value
                                    });
                                }}/>
                                <label
                                    className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${accountData.firstName
                                    ? "opacity-100"
                                    : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                    First name
                                </label>
                            </div>
                            <div
                                className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[18px] shadow-lg border-2 group ml-4">
                                <input
                                    type="text"
                                    className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${accountData.lastName
                                    ? "pt-4"
                                    : ""} group`}
                                    placeholder="Last name"
                                    value={accountData.lastName}
                                    onChange={(e) => {
                                    setAccountData({
                                        ...accountData,
                                        lastName: e.target.value
                                    });
                                }}/>
                                <label
                                    className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${accountData.lastName
                                    ? "opacity-100"
                                    : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                    Last name
                                </label>
                            </div>
                        </div>
                        <div
                            className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[18px] shadow-lg border-2 group">
                            <input
                                type="text"
                                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${accountData.username
                                ? "pt-4"
                                : ""} group`}
                                placeholder="Username"
                                value={accountData.username}
                                onChange={(e) => {
                                setAccountData({
                                    ...accountData,
                                    username: e.target.value
                                });
                            }}/>
                            <label
                                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${accountData.username
                                ? "opacity-100"
                                : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                Username
                            </label>
                        </div>
                        <div
                            className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[18px] shadow-lg border-2 group">
                            <input
                                type="password"
                                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${accountData.password1
                                ? "pt-4"
                                : ""} group`}
                                placeholder="Enter password"
                                value={accountData.password1}
                                onChange={(e) => {
                                setAccountData({
                                    ...accountData,
                                    password1: e.target.value
                                });
                            }}/>
                            <label
                                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${accountData.password1
                                ? "opacity-100"
                                : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                Password
                            </label>
                        </div>
                        <div
                            className="relative bg-main-background rounded-[20px] w-full h-[46px] mb-[18px] shadow-lg border-2 group">
                            <input
                                type="password"
                                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${accountData.password2
                                ? "pt-4"
                                : ""} group`}
                                placeholder="Confirm password"
                                value={accountData.password2}
                                onChange={(e) => {
                                setAccountData({
                                    ...accountData,
                                    password2: e.target.value
                                });
                            }}/>
                            <label
                                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${accountData.password2
                                ? "opacity-100"
                                : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                Confirm password
                            </label>
                        </div>
                        <h1 className="text-[20px] font-bold text-letters-color pb-1">
                            Recovery Questions
                        </h1>
                        {[0, 1, 2].map((index) => (
                            <div key={index}>
                                <select
                                    value={selectedOptions[index]}
                                    onChange={(event) => handleSelectChange(event, index)}
                                    className="w-full px-4 text-[20px] border-2 flex items-center text-add-minus bg-main-background rounded-[20px] shadow-lg h-[46px] mb-[18px]">
                                    <option value="" disabled hidden>{selectedOptions[index]
                                            ? selectedOptions[index]
                                            : `Question ${index + 1}`}</option>
                                    {initialSecurityQuestions.map((question, questionIndex) => (
                                        <option key={questionIndex} value={question}>
                                            {question}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className="w-full px-4 text-[20px] border-2 flex items-center text-letters-color bg-main-background rounded-[20px] shadow-lg h-[46px] mb-[18px]"/>
                            </div>
                        ))}
                        <h3>{!isSetup && "Company Role:"}</h3>
                        {!isSetup && options.map((option) => (
                            <div key={option.value} className="pl-8">
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="dynamicRadio"
                                    value={option.value}
                                    checked={accountData.companyRole === option.value}
                                    onChange={(e) => setAccountData({
                                    ...accountData,
                                    companyRole: e.target.value
                                })}
                                    className=" accent-primary-color"/>
                                <label htmlFor={option.value}>{option.label}</label>
                            </div>
                        ))}
                        <h3 className="text-[20px] font-bold text-letters-color mb-1">{isSetup && "Access Code:"}</h3>
                        {isSetup && (
                            <div
                                className="relative bg-main-background rounded-[20px] w-full h-[46px] shadow-lg border-2 mb-4 group">
                                <input
                                    type="text"
                                    className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${accountData.code
                                    ? "pt-4"
                                    : ""} group`}
                                    placeholder="Enter code"
                                    value={accountData.code}
                                    onChange={(e) => {
                                    setAccountData({
                                        ...accountData,
                                        code: e.target.value
                                    });
                                }}/>
                                <label
                                    className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${accountData.code
                                    ? "opacity-100"
                                    : "opacity-0"} transition-opacity bg-transparent group-active:inline-block`}>
                                    Code
                                </label>
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            className="bg-primary-color text-custom-white rounded-[20px] w-full h-[46px] mt-2 mb-4 self-center">
                            {isSetup
                                ? "Create"
                                : "Request"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
