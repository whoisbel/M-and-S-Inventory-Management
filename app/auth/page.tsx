"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";

import { createAccountData, loginAccountData } from "@/types";
import { RegistrationModal } from "@/components";
import { LoginModal } from "@/components";
const Auth = () => {
  const [isSetup, setIsSetup] = useState(false);
  //account registration
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [accountData, setAccountData] = useState<createAccountData>({
    firstName: "",
    middleName: "",
    lastName: "",
    password1: "",
    password2: "",
    companyRole: "",
    username: "",
    code: "",
  });
  const [loginData, setLoginData] = useState<loginAccountData>({
    username: "",
    password: "",
  });
  useEffect(() => {
    const fetchIsSetup = async () => {
      const response = await fetch("/api/auth/register");
      const { isSetup } = await response.json();
      setIsSetup(isSetup);
    };
    fetchIsSetup();
  }, []);

  return (
    <div className="h-full w-full bg-main-background text-black flex justify-center items-center">
      <div className="w-[375px] h-max bg-custom-white rounded-3xl flex flex-col items-center justify-center pl-6 pr-6 pt-8 pb-8">
        <h1 className="text-[41px] font-bold mb-[22px]">M&S Company</h1>
        <LoginModal
          setShowRegisterModal={setShowRegisterModal}
          loginData={loginData}
          setLoginData={setLoginData}
        />
      </div>

      {(showRegisterModal || isSetup) && (
        <RegistrationModal
          setShowModal={setShowRegisterModal}
          accountData={accountData}
          setAccountData={setAccountData}
          isSetup={isSetup}
        />
      )}
    </div>
  );
};

export default Auth;
