"use client";
import { GreenButton, Textfield } from "@/components";

const ChangePassword = () => {
  return (
    <div className="relative ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg">
      <div className=" flex flex-col border-b-4 border-primary-color">
        <span className="text-[20px]">Change Password</span>
      </div>
      <div className="mx-6 my-4 flex flex-col space-y-4 text-[20px]">
        <div className="flex flex-col space-y-2">
          <span>Current Password</span>
          <Textfield />
        </div>
        <div className="flex flex-col space-y-2">
          <span>New Password</span>
          <Textfield />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Confirm Password</span>
          <Textfield />
        </div>
      </div>
      <div className=" absolute bottom-5 right-5 out">
        <GreenButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default ChangePassword;
