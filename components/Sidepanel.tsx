"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineReceiptLong, MdOutlineHistory } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { signOut } from "next-auth/react";
const Sidepanel = () => {
  const pathname = usePathname();

  // active:bg-main-background active:text-letters-color
  //h-[calc(100vh-1em)] 1em paras padding top (.5em) and bottom (.5em)
  return (
    <div className="sticky top-2 left-2 bottom-2 lg:min-w-[300px] h-[calc(100vh-1em)] bg-primary-green rounded-lg lg:block bg-primary-color ">
      <ul className="text-[20px] flex flex-col w-full">
        <li className="rounded-t-lg sidepanel_link bg-accent-green h-[95px]">
          <div className="set_icon">
          <TbLogout className="w-[35px] h-[35px]" />
          </div>
          <div className="grid justify-items-start">
            <span>
            Name of user
            </span>
            <span className="text-[15px] ">
              Role
            </span>
          </div>
        </li>
        <Link
          className={`${
            pathname == "/"
              ? " bg-main-background text-letters-color"
              : " bg-primary-color"
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

          <span className="lg:inline hidden">Dashboard</span>
        </Link>
        <Link
          className={`${
            pathname == "/admin_mngt"
              ? " bg-main-background text-letters-color"
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/admin_mngt/"
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
          <span className="lg:inline hidden">Admin Management</span>
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
          
          <span className="lg:inline hidden">Inventory Input</span>
        </Link>
        <Link
          className={`${
            pathname.includes("/inventory/")
              ? " bg-main-background text-letters-color"
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
          
          <span className="lg:inline hidden">Inventory</span>
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
          
          <span className="lg:inline hidden">Order Details</span>
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

          <span className="lg:inline hidden">History</span>
        </Link>
        <Link
          className={`${
            pathname == "/user_settings"
              ? " bg-main-background text-letters-color"
              : " bg-primary-color"
          } sidepanel_link h-[75px]`}
          href="/user_settings/"
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
          
          <span className="lg:inline hidden">User Settings</span>
        </Link>
        <li
          className="sidepanel_link bg-primary-color border-b-[3px] h-[75px]"
          onClick={() => {
            signOut();
          }}
        >
          <div className="set_icon">
            <TbLogout className="w-[35px] h-[35px]" />
          </div>
          
          <span className="lg:inline hidden">Sign Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidepanel;
