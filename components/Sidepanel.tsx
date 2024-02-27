"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineReceiptLong, MdOutlineHistory } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { BiUserCircle } from "react-icons/bi";
const Sidepanel = ({ user }: User) => {
  const pathname = usePathname();

  // active:bg-main-background active:text-letters-color
  //h-[calc(100vh-1em)] 1em paras padding top (.5em) and bottom (.5em)
  return (
    <div className="sticky top-2 left-2 bottom-2 lg:min-w-[300px] h-[calc(100vh-1em)] bg-primary-green rounded-lg lg:block bg-primary-color ">
      <ul className="text-[20px] flex flex-col w-full">
        <li className="rounded-t-lg sidepanel_link bg-accent-green text-letters-color h-[95px]">
          <div className="set_icon">
            <BiUserCircle className="w-[35px] h-[35px]" />
          </div>
          <div className="grid justify-items-start">
            <h3 className="text-[20px] font-bold ">
              {user &&
                user.firstName &&
                `${user.firstName
                  .substring(0, 1)
                  .toUpperCase()}${user.firstName.substring(1)} ${user.lastName
                  .substring(0, 1)
                  .toUpperCase()}${user.lastName.substring(1)}`}
            </h3>
            <p className="text-[15px]">{user.isAdmin ? "Admin" : "Employee"}</p>
          </div>
        </li>
        <Link
          className={`${
            pathname == "/" ? " bg-main-background " : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/"
        >
          <div className="set_icon">
            <LuLayoutDashboard
              className={
                pathname == "/"
                  ? "text-primary-color w-[35px] h-[35px]"
                  : "text-main-background w-[35px] h-[35px]"
              }
            />
          </div>

          <span
            className={
              pathname == "/"
                ? "text-letters-color lg:inline hidden"
                : "text-main-background lg:inline hidden"
            }
          >
            Dashboard
          </span>
        </Link>
        <Link
          className={`${
            pathname.includes("/admin_mngt/")
              ? " bg-main-background"
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/admin_mngt/inventory_mngt/area_list/"
        >
          <div className="set_icon">
            <RiAdminLine
              className={
                pathname.includes("/admin_mngt/")
                  ? "text-primary-color w-[35px] h-[35px]"
                  : "text-main-background w-[35px] h-[35px]"
              }
            />
          </div>
          <span
            className={
              pathname.includes("/admin_mngt/")
                ? "text-letters-color lg:inline hidden"
                : "text-main-background lg:inline hidden"
            }
          >
            Admin Management
          </span>
        </Link>
        <Link
          className={`${
            pathname.includes("/inventory_input/")
              ? " bg-main-background text-letters-color"
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/inventory_input/add_inventory"
        >
          <div className="set_icon">
            <TfiWrite
              className={`${
                pathname.includes("/inventory_input/")
                  ? "text-primary-color"
                  : "text-main-background"
              }  w-[35px] h-[35px]`}
            />
          </div>

          <span
            className={
              pathname.includes("/inventory_input/")
                ? "text-letters-color lg:inline hidden"
                : "text-main-background lg:inline hidden"
            }
          >
            Inventory Input
          </span>
        </Link>
        <Link
          className={`${
            pathname.includes("/inventory/")
              ? " bg-main-background "
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/inventory/inventory"
        >
          <div className="set_icon">
            <SlNotebook
              className={`${
                pathname.includes("/inventory/")
                  ? "text-primary-color"
                  : "text-main-background"
              }  w-[35px] h-[35px]`}
            />
          </div>

          <span
            className={
              pathname.includes("/inventory/")
                ? "text-letters-color lg:inline hidden"
                : "text-main-background lg:inline hidden"
            }
          >
            Inventory
          </span>
        </Link>
        <Link
          className={`${
            pathname.includes("/order_details")
              ? " bg-main-background text-letters-color"
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/order_details/"
        >
          <div className="set_icon">
            <MdOutlineReceiptLong
              className={`${
                pathname.includes("/order_details")
                  ? "text-primary-color"
                  : "text-main-background"
              }  w-[35px] h-[35px]`}
            />
          </div>

          <span
            className={
              pathname == "/order_details"
                ? "text-letters-color lg:inline hidden"
                : "text-main-background lg:inline hidden"
            }
          >
            Order Details
          </span>
        </Link>
        <Link
          className={`${
            pathname.includes("/history")
              ? " bg-main-background text-letters-color"
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/history/"
        >
          <div className="set_icon">
            <MdOutlineHistory
              className={`${
                pathname.includes("/history")
                  ? "text-primary-color"
                  : "text-main-background"
              }  w-[35px] h-[35px]`}
            />
          </div>

          <span
            className={
              pathname == "/history"
                ? "text-letters-color lg:inline hidden"
                : "text-main-background lg:inline hidden"
            }
          >
            History
          </span>
        </Link>
        <Link
          className={`${
            pathname.includes("/user_settings/")
              ? " bg-main-background text-letters-color"
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/user_settings/settings/user_info/"
        >
          <div className="set_icon">
            <IoMdSettings
              className={
                pathname.includes("/user_settings/")
                  ? "text-primary-color w-[35px] h-[35px]"
                  : "text-main-background w-[35px] h-[35px]"
              }
            />
          </div>

          <span
            className={
              pathname.includes("/user_settings/")
                ? "text-letters-color lg:inline hidden"
                : "text-main-background lg:inline hidden"
            }
          >
            User Settings
          </span>
        </Link>
        <li
          className="sidepanel_link bg-primary-color border-b-[3px] h-[75px]"
          onClick={() => {
            signOut();
          }}
        >
          <div className="set_icon">
            <TbLogout className="w-[35px] h-[35px] text-main-background " />
          </div>

          <span className="lg:inline hidden text-main-background">
            Sign Out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidepanel;
