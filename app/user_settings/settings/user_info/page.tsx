"use client";
import { GreenButton, RedButton, Textfield } from "@/components";

const UserInfo = () => {
  return (
    <div className="relative ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg">
      <div className=" flex flex-col border-b-4 border-primary-color">
        <span className="text-[20px]">User Information</span>
      </div>
      <div className="mx-6 my-4 flex flex-col space-y-4 text-[20px]">
        <div className="flex flex-col space-y-2">
          <span>First Name</span>
          <Textfield />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Last Name</span>
          <Textfield />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Username</span>
          <Textfield />
        </div>
      </div>
      <div className=" absolute bottom-5 right-5 out">
        <GreenButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default UserInfo;
