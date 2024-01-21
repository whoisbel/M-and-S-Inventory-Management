"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <>
      <div className="flex">
        <Link
          href="/inventory_input/add_inventory"
          className={`${
            pathName == "/inventory_input/add_inventory"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } px-4 py-2 rounded-tl-lg font-bold`}
        >
          Add Inventory
        </Link>
        <Link
          href="/inventory_input/categorize"
          className={`${
            pathName == "/inventory_input/categorize"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } px-4 py-2 rounded-tr-lg font-bold`}
        >
          Categorize
        </Link>
      </div>
      {children}
    </>
  );
}
