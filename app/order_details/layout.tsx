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
      <div className="flex">
        <Link
          href="/order_details"
          className={`${
            pathName == "/order_details"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } px-4 py-2 rounded-tl-lg font-bold`}
        >
          Order Details
        </Link>
      </div>
      {children}
    </div>
  );
}
