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
    <div className="flex flex-col h-full bg-accent-green p-3 rounded-lg">
      <div className="tab_buttons">
        <Link
          href="/inventory/inventory"
          className={`${
            pathName == "/inventory/inventory"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          }`}
        >
          Inventory
        </Link>
        <Link
          href="/inventory/available_products"
          className={`${
            pathName == "/inventory/available_products"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } `}
        >
          Available_products
        </Link>
        <Link
          href="/inventory/stockout"
          className={`${
            pathName == "/inventory/stockout"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          }`}
        >
          Stockout
        </Link>
      </div>
      {children}
    </div>
  );
}
