"use client";
import React, { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const Registration = () => {
    const [modalFname, setModalFname] = useState("");  // Separate state for first name in the modal
    const [modalMname, setModalMname] = useState("");  // Separate state for middle name in the modal
    const [modalLname, setModalLname] = useState("");  // Separate state for last name in the modal
    const [accessCode, setAccessCode] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [registerPassword, setRegisterPassword] = useState("")
    const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("")
    const options = [
      { label: "Admin", value: "Admin" },
      { label: "Employee", value: "Employee" },
    ];
    const handleOptionChange = (event: any) => {
      const value = event.target.value;
      setSelectedOption(value);
    };

    const createAccount = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
      // Clear the input fields when closing the modal
      setModalFname("");
      setModalMname("");
      setModalLname("");
      setAccessCode("")
    };

    const handleSubmit = () => {
      // Add your logic to handle the form submission based on selected options
      // Add your code to submit the form data or any other action
      setShowModal(false);
      // Clear the input fields when closing the modal
      setModalFname("");
      setModalMname("");
      setModalLname("");
      setAccessCode("")
    };

    if (showModal) {
      return (
        <div className="w-full h-full flex justify-center items-center fixed bg-main-background/90">
          <div className="w-[500px] rounded-lg bg-custom-white">
            <div className="flex w-full justify-between items-center bg-accent-gray p-4 rounded-t-lg">
              <p className="text-[20px] font-bold text-letters-color">Create Account</p>
              <button onClick={closeModal}>X</button>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="w-max h-max flex flex-col justify-center">
                <h1 className="text-[40px] font-bold text-letters-color p-2 self-center">M&S Company</h1>
                <h1 className="text-[20px] font-bold text-letters-color pb-2 -ml-4">User Information</h1>
                <input
                  type="text"
                  className="bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] pl-4 text-[20px] shadow-lg"
                  placeholder="First name"
                  value={modalFname}
                  onChange={(e) => {
                    setModalFname(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] pl-4 text-[20px] shadow-lg"
                  placeholder="Middle name"
                  value={modalMname}
                  onChange={(e) => {
                    setModalMname(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] pl-4 text-[20px] shadow-lg"
                  placeholder="Last name"
                  value={modalLname}
                  onChange={(e) => {
                    setModalLname(e.target.value);
                  }}
                />
                <input
                  type="password"
                  className="bg-main-background rounded-3xl w-[300px] h-[50px] mb-[22px] pl-4 text-[20px] shadow-lg"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                />
                <input
                  type="password"
                  className="bg-main-background rounded-3xl w-[300px] h-[50px] mb-[22px] pl-4 text-[20px] shadow-lg"
                  placeholder="Confirm Password"
                  value={confirmRegisterPassword}
                  onChange={(e) => {
                    setConfirmRegisterPassword(e.target.value);
                  }}
                />
                <h3>Company Role:</h3>
                {options.map((option) => (
                  <div key={option.value}>
                    <input
                      type="radio"
                      id={option.value}
                      name="dynamicRadio"
                      value={option.value}
                      checked={selectedOption === option.value}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
                {
                  selectedOption === "Admin" ?
                  <input
                    type="text"
                    className="bg-main-background rounded-[20px] w-[300px] h-[50px] mt-[22px] mb-[22px] pl-4 text-[20px] shadow-lg"
                    placeholder="Enter code"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                    }}
                  /> :
                  <input
                    type="text"
                    className="bg-main-background rounded-[20px] w-[300px] h-[50px] mt-[22px] mb-[22px] pl-4 text-[20px] shadow-lg opacity-50 cursor-not-allowed"
                    placeholder="Enter code"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                    }}
                    disabled
                  />
                }
                <button onClick={handleSubmit} className="bg-primary-color text-custom-white rounded-[20px] w-[300px] h-[50px] mt-4 mb-4">
                    Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <p className="self-start pl-4 mt-1 text-[#0094FF] text-[15px] underline cursor-pointer" onClick={createAccount}>
        Create account here
      </p>
    );
  };

  return (
    <div className="h-full w-full bg-main-background text-black flex justify-center items-center">
      <div className="w-[375px] h-max bg-custom-white rounded-3xl flex flex-col items-center justify-center pl-6 pr-6 pt-8 pb-8">
        <h1 className="text-[41px] font-bold mb-[22px]">M&S Company</h1>
        <input
          type="text"
          className="bg-main-background rounded-3xl w-[300px] h-[50px] mb-[22px] pl-4 text-[20px] shadow-lg"
          placeholder="ID"
          value={id}
          onChange={(e) => {
            setID(e.target.value);
          }}
        />
        <input
          type="password"
          className="bg-main-background rounded-3xl w-[300px] h-[50px] mb-[22px] pl-4 text-[20px] shadow-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            signIn("credentials", {
              id: id,
              password: password,
              callbackUrl: "/",
            });
          }}
          className="w-[300px] h-[50px] text-custom-white bg-primary-color rounded-3xl font-bold text-[20px]"
        >
          Login
        </button>
        <Registration />
      </div>
    </div>
  );
};

export default Login;
