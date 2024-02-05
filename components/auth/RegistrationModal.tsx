"use client";

import { createAccountData } from "@/types";
import { swalCustomClass } from "@/utils/swalConfig";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import Swal from "sweetalert2";
const RegistrationModal = ({
  setShowModal,
  accountData,
  setAccountData,
  isSetup = false,
}: {
  setShowModal: (value: boolean) => void;
  accountData: createAccountData;
  setAccountData: (data: createAccountData) => void;
  isSetup?: boolean;
}) => {
  useEffect(() => {
    if (isSetup) {
      setAccountData({
        ...accountData,
        companyRole: "Admin",
        isSetup: isSetup,
      });
    }
  }, []);
  const options = [
    { label: "Admin", value: "Admin" },
    { label: "Employee", value: "Employee" },
  ];

  const clearAccountData = () => {
    // Clear the input fields when closing the modal
    const data = accountData;
    Object.keys(data).map((key) => {
      data[key] = "";
    });
    setAccountData(data);
  };
  const closeModal = () => {
    setShowModal(false);
    clearAccountData();
  };

  const handleSubmit = async () => {
    //password1 and password2 checking,
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(accountData),
    });
    if (isSetup) {
      if (response.ok) {
        Swal.fire({
          title: "User Registered",
          icon: "success",
          customClass: swalCustomClass,
        });
        signIn("credentials", {
          username: accountData.username,
          password: accountData.password1,
          callbackUrl: "/",
        });
      } else {
        const { error } = await response.json();
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          customClass: swalCustomClass,
        });
      }
    } else {
      if (response.ok) {
        Swal.fire({
          title: "User Account Requested",
          icon: "success",
          text: "Please wait for approval",
          customClass: swalCustomClass,
        }).then(() => {
          closeModal();
        });
      } else {
        const { error } = await response.json();
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          customClass: swalCustomClass,
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center fixed bg-main-background/90">
      <div className="w-[500px] rounded-lg bg-custom-white">
        <div className="flex w-full justify-between items-center bg-accent-gray p-4 rounded-t-lg">
          <p className="text-[20px] font-bold text-letters-color">
            {isSetup ? "Setup Account" : "Create Account"}
          </p>
          <button onClick={closeModal}>X</button>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-max h-max flex flex-col justify-center">
            <h1 className="text-[40px] font-bold text-letters-color p-2 self-center">
              M&S Company
            </h1>
            <h1 className="text-[20px] font-bold text-letters-color pb-2 -ml-4">
              User Information
            </h1>
            <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
              <input
                type="text"
                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                  accountData.firstName ? "pt-4" : ""
                } group`}
                placeholder="First name"
                value={accountData.firstName}
                onChange={(e) => {
                  setAccountData({
                    ...accountData,
                    firstName: e.target.value,
                  });
                }}
              />
              <label
                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                  accountData.firstName ? "opacity-100" : "opacity-0"
                } transition-opacity bg-transparent group-active:inline-block`}
              >
                First name
              </label>
            </div>
            <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
              <input
                type="text"
                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                  accountData.middleName ? "pt-4" : ""
                } group`}
                placeholder="Middle name"
                value={accountData.middleName}
                onChange={(e) => {
                  setAccountData({
                    ...accountData,
                    middleName: e.target.value,
                  });
                }}
              />
              <label
                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                  accountData.middleName ? "opacity-100" : "opacity-0"
                } transition-opacity bg-transparent group-active:inline-block`}
              >
                Middle name
              </label>
            </div>
            <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
              <input
                type="text"
                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                  accountData.lastName ? "pt-4" : ""
                } group`}
                placeholder="Last name"
                value={accountData.lastName}
                onChange={(e) => {
                  setAccountData({
                    ...accountData,
                    lastName: e.target.value,
                  });
                }}
              />
              <label
                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                  accountData.lastName ? "opacity-100" : "opacity-0"
                } transition-opacity bg-transparent group-active:inline-block`}
              >
                Last name
              </label>
            </div>
            <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
              <input
                type="text"
                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                  accountData.username ? "pt-4" : ""
                } group`}
                placeholder="Username"
                value={accountData.username}
                onChange={(e) => {
                  setAccountData({
                    ...accountData,
                    username: e.target.value,
                  });
                }}
              />
              <label
                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                  accountData.username ? "opacity-100" : "opacity-0"
                } transition-opacity bg-transparent group-active:inline-block`}
              >
                Username
              </label>
            </div>
            <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
              <input
                type="password"
                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                  accountData.password1 ? "pt-4" : ""
                } group`}
                placeholder="Enter password"
                value={accountData.password1}
                onChange={(e) => {
                  setAccountData({
                    ...accountData,
                    password1: e.target.value,
                  });
                }}
              />
              <label
                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                  accountData.password1 ? "opacity-100" : "opacity-0"
                } transition-opacity bg-transparent group-active:inline-block`}
              >
                Password
              </label>
            </div>
            <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
              <input
                type="password"
                className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                  accountData.password2 ? "pt-4" : ""
                } group`}
                placeholder="Confirm password"
                value={accountData.password2}
                onChange={(e) => {
                  setAccountData({
                    ...accountData,
                    password2: e.target.value,
                  });
                }}
              />
              <label
                className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                  accountData.password2 ? "opacity-100" : "opacity-0"
                } transition-opacity bg-transparent group-active:inline-block`}
              >
                Confirm password
              </label>
            </div>
            <h3>Company Role:</h3>
            {!isSetup &&
              options.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={option.value}
                    name="dynamicRadio"
                    value={option.value}
                    checked={accountData.companyRole === option.value}
                    onChange={(e) =>
                      setAccountData({
                        ...accountData,
                        companyRole: e.target.value,
                      })
                    }
                    className=" accent-primary-color"
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}

            {isSetup && (
              <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mt-[22px] mb-[22px] shadow-lg border-2 group">
                <input
                  type="text"
                  className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
                    accountData.code ? "pt-4" : ""
                  } group`}
                  placeholder="Enter code"
                  value={accountData.code}
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      code: e.target.value,
                    });
                  }}
                />
                <label
                  className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
                    accountData.code ? "opacity-100" : "opacity-0"
                  } transition-opacity bg-transparent group-active:inline-block`}
                >
                  Code
                </label>
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="bg-primary-color text-custom-white rounded-[20px] w-[300px] h-[50px] mt-4 mb-4"
            >
              {isSetup ? "Create" : "Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
