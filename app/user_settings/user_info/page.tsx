"use client";
import { useEffect, useState } from "react";
import { GreenButton, RedButton, Textfield } from "@/components";
import { User } from "@prisma/client";
import { getSession } from "next-auth/react";
import Swal from "sweetalert2";
import { swalCustomClass } from "@/utils/swalConfig";

const UserInfo = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchSession();
  }, []);

  async function handleSubmit() {
    const res = await fetch("/api/user_settings/user_info/", {
      method: "PATCH",
      body: JSON.stringify(user),
    });
    const { message } = await res.json();
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
        customClass: swalCustomClass,
      }).then(() => {
        location.reload();
      });
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

    <div className="relative ml-3 pt-4 px-4 w-full border border-add-minus rounded-lg">
      <div className=" flex flex-col border-b-4 border-primary-color">
        <span className="text-[20px]">User Information</span>
      </div>
      <div className="mx-6 my-4 flex flex-col space-y-4 text-[20px]">
        <div className="flex flex-col space-y-2">
          <span>First Name</span>
          <Textfield
            value={user ? user.firstName : ""}
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Last Name</span>
          <Textfield
            value={user ? user.lastName : ""}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Username</span>
          <Textfield
            value={user ? user.userName : ""}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
        </div>
      </div>
      <div className=" absolute bottom-5 right-5 ">
        <GreenButton onClick={() => handleSubmit()}>Save Changes</GreenButton>
      </div>
    </div>
  );
};

export default UserInfo;
