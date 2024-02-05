"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginAccountData } from "@/types";

const LoginModal = ({
  setShowRegisterModal,
  loginData,
  setLoginData,
}: {
  setShowRegisterModal: (val: boolean) => void;
  loginData: loginAccountData;
  setLoginData: (val: loginAccountData) => void;
}) => {
  return (
    <div>
      <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
        <input
          type="text"
          className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
            loginData.username ? "pt-4" : ""
          } group`}
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => {
            setLoginData({ ...loginData, username: e.target.value });
          }}
        />
        <label
          className={`absolute -top-[0.80rem] left-4 text-[15px] text-add-minus ${
            loginData.username ? "opacity-100" : "opacity-0"
          } transition-opacity bg-transparent group-active:inline-block`}
        >
          ID
        </label>
      </div>
      <div className="relative bg-main-background rounded-[20px] w-[300px] h-[50px] mb-[22px] shadow-lg border-2 group">
        <input
          type="password"
          className={`w-full h-full px-4 pt-2 text-[20px] bg-transparent border-none focus:outline-none relative z-1 ${
            loginData.password ? "pt-4" : ""
          } group`}
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
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
      <button
        onClick={() => {
          signIn("credentials", {
            username: loginData.username,
            password: loginData.password,
            callbackUrl: "/",
          });
        }}
        className="w-[300px] h-[50px] text-custom-white bg-primary-color rounded-3xl font-bold text-[20px]"
      >
        Login
      </button>
      <p
        className="self-start pl-4 mt-1 text-[#0094FF] text-[15px] underline cursor-pointer"
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
