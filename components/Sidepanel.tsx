"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidepanel = () => {
  const pathname = usePathname();

  // active:bg-main-background active:text-letters-color
  return (
    <div className="sticky top-0 left-0 h-full bg-primary-green rounded-lg hidden md:block bg-primary-color">
      <ul className="text-[30px] flex flex-col min-w-[300px]">
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
          Dashboard
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
          Inventory Input
        </Link>
      </ul>
    </div>
  );
};

export default Sidepanel;
