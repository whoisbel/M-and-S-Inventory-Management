"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { DisplayID } from "@/components";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <div className="flex flex-col h-full bg-accent-green p-3 rounded-lg">
      <div className="tab_buttons">
        <Link
          href="/inventory_input/add_inventory"
          className={`${
            pathName == "/inventory_input/add_inventory"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } `}
        >
          Add Inventory
        </Link>
        <Link
          href="/inventory_input/harvest_logs"
          className={`${
            pathName == "/inventory_input/categorize"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          }`}
        >
          Harvest Logs
        </Link>
      </div>
      {children}
    </div>
  );
}
