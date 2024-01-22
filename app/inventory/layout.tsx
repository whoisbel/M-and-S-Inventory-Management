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
          href="/inventory/available_products"
          className={`${
            pathName == "/inventory/available_products"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } px-4 py-2 rounded-tl-lg font-bold`}
        >
          Available_products
        </Link>
        <Link
          href="/inventory/stockout"
          className={`${
            pathName == "/inventory/stockout"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } px-4 py-2 rounded-tr-lg font-bold`}
        >
          stockout
        </Link>
        <Link
          href="/inventory/records"
          className={`${
            pathName == "/inventory/records"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } px-4 py-2 rounded-tr-lg font-bold`}
        >
          records
        </Link>
      </div>
      {children}
    </>
  );
}
