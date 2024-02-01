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
<div className="sticky top-2 left-2 bottom-2 h-[calc(100vh-1em)] bg-primary-green rounded-lg lg:block bg-primary-color">
  <ul className="text-[30px] flex flex-col w-full lg:min-w-[300px]">
    <Link
      className={`${
        pathname == "/"
          ? " bg-main-background text-letters-color"
          : " bg-primary-color"
      } sidepanel_link`}
      href="/"
    >
      <LuLayoutDashboard
        className={
          pathname == "/"
            ? "text-primary-color w-11 h-11"
            : "text-main-background w-11 h-11"
        }
      />
      <span className="lg:inline hidden">Dashboard</span>
    </Link>
    <Link
      className={`${
        pathname.includes("/inventory_input/")
          ? " bg-main-background text-letters-color"
          : " bg-primary-color"
      } sidepanel_link`}
      href="/inventory_input/add_inventory"
    >
      <TfiWrite
        className={`${
          pathname.includes("/inventory_input/")
            ? "text-primary-color"
            : "text-main-background"
        }  w-11 h-11`}
      />
      <span className="lg:inline hidden">Inventory Input</span>
    </Link>
    <Link
      className={`${
        pathname.includes("/inventory/")
          ? " bg-main-background text-letters-color"
          : " bg-primary-color"
      } sidepanel_link`}
      href="/inventory/available_products"
    >
      <SlNotebook
        className={`${
          pathname.includes("/inventory/")
            ? "text-primary-color"
            : "text-main-background"
        }  w-11 h-11`}
      />
      <span className="lg:inline hidden">Inventory</span>
    </Link>
    <Link
      className={`${
        pathname.includes("/order_details")
          ? " bg-main-background text-letters-color"
          : " bg-primary-color"
      } sidepanel_link`}
      href="/order_details/"
    >
      <MdOutlineReceiptLong
        className={`${
          pathname.includes("/order_details")
            ? "text-primary-color"
            : "text-main-background"
        }  w-11 h-11`}
      />
      <span className="lg:inline hidden">Order Details</span>
    </Link>
    <Link
      className={`${
        pathname.includes("/history")
          ? " bg-main-background text-letters-color"
          : " bg-primary-color"
      } sidepanel_link`}
      href="/history/"
    >
      <MdOutlineHistory
        className={`${
          pathname.includes("/history")
            ? "text-primary-color"
            : "text-main-background"
        }  w-11 h-11`}
      />
      <span className="lg:inline hidden">History</span>
    </Link>
    <li
      className="sidepanel_link bg-primary-color"
      onClick={() => {
        signOut();
      }}
    >
      <TbLogout className="w-12 h-12" />
      <span className="lg:inline hidden">Sign Out</span>
    </li>
  </ul>
</div>
  );
};

export default Sidepanel;
