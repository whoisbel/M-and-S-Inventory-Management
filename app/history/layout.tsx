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
          href="/history"
          className={`${
            pathName == "/history"
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } px-4 py-2 rounded-tl-lg font-bold`}
        >
          History
        </Link>
      </div>
      {children}
    </>
  );
}
