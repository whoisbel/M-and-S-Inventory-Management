"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginAccountData } from "@/types";
import { redirect, useRouter } from "next/navigation";

import { BiError } from "react-icons/bi";

const LoginModal = ({
  setShowRegisterModal,
  setShowForgotPasswordModal,
  loginData,
  setLoginData,
}: {
  setShowRegisterModal: (val: boolean) => void;
  setShowForgotPasswordModal: (val: boolean) => void;
  loginData: loginAccountData;
  setLoginData: (val: loginAccountData) => void;
}) => {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const router = useRouter();
  async function handleSignIn() {
    const res = await signIn("credentials", {
      username: loginData.username,
      password: loginData.password,
      redirect: false,
    });

    if (res?.ok) {
      location.href = "/";
    } else {
      setWrongCredentials(true);
    }
  }

  function setLoginData2(val: loginAccountData) {
    setLoginData(val);
    setWrongCredentials(false); // reset wrong credentials
  }

  return (
    <div className="">
      <div className=" pb-2">
      <div className=" relative bg-main-background rounded-[20px] w-[300px] h-[46px] mb-[18px] shadow-lg border-2 group">
        <input
          type="text"
          className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
            loginData.username ? "pt-4" : ""
          } group`}
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => {
            setLoginData2({ ...loginData, username: e.target.value });
          }}
        />
        <label
          className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
            loginData.username ? "opacity-100" : "opacity-0"
          } transition-opacity bg-transparent group-active:inline-block`}
        >
          Username
        </label>
      </div>
      </div>
      <div className=" pb-2">
      <div className=" relative bg-main-background rounded-[20px] w-[300px] h-[46px] mb-[10px] shadow-lg border-2 group">
        <input
          type="password"
          className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
            loginData.password ? "pt-4" : ""
          } group`}
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => {
            setLoginData2({ ...loginData, password: e.target.value });
          }}
        />
        <label
          className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
            loginData.password ? "opacity-100" : "opacity-0"
          } transition-opacity bg-transparent group-active:inline-block`}
        >
          Password
        </label>
      </div>
      </div>
      {wrongCredentials && (
        <span className="text-red-500 text-[15px] flex items-center justify-center">
          <BiError /> Wrong username or password
        </span>
      )}
      <p
        className="text-right pb-2 pr-4 mb-2 text-[#0094FF] text-[15px] underline cursor-pointer"
        onClick={(e) => {
          setShowForgotPasswordModal(true);
        }}
      >
        Forgot password?
      </p>
      <button
        onClick={(e) => {
          handleSignIn();
        }}
        className="w-[300px] h-[46px] text-custom-white bg-primary-color rounded-3xl font-bold text-[20px]"
      >
        Login
      </button>
      <p
        className="self-start pt-2 pl-4 mt-1 text-[#0094FF] text-[15px] underline cursor-pointer"
        onClick={(e) => {
          setShowRegisterModal(true);
        }}
      >
        Create account here
      </p>
    </div>
  );
};

export default LoginModal;
