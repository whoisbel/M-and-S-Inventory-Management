"use client";
import { useState, useEffect } from "react";
import { GreenButton, Textfield } from "@/components";
import { changePasswordType } from "@/types";
import Swal from "sweetalert2";
import { swalCustomClass } from "@/utils/swalConfig";
const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState<changePasswordType>({
    oldPassword: "",
    newPassword: "",
    confNewPassword: "",
  });

  async function handleSubmit() {
    const res = await fetch("/api/user_settings/change_password/", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
    });
    const { message } = await res.json();
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
        customClass: swalCustomClass,
      }).then(() => location.reload());
    } else {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        customClass: swalCustomClass,
      });
    }
  }
  return (
    <div className="relative ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg">
      <div className=" flex flex-col border-b-4 border-primary-color">
        <span className="text-[20px]">Change Password</span>
      </div>
      <div className="mx-6 my-4 flex flex-col space-y-4 text-[20px]">
        <div className="flex flex-col space-y-2">
          <span>Current Password</span>
          <Textfield
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, oldPassword: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>New Password</span>
          <Textfield
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Confirm Password</span>
          <Textfield
            type="password"
            value={passwordData.confNewPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confNewPassword: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className=" absolute bottom-5 right-5 ">
        <GreenButton
          onClick={() => {
            handleSubmit();
          }}
        >
          Save Changes
        </GreenButton>
      </div>
    </div>
  );
};

export default ChangePassword;
